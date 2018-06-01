import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delayWhen, map, retryWhen} from 'rxjs/internal/operators';
import {Observable, of, timer} from 'rxjs';

export interface WeatherData {
  name: string;
  data: {
    temp: number;
    text: string;
    link: string;
    icon: string;
  };
}

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getWeather(city: string): Observable<WeatherData> {
    const yql = `select item.condition, item.description, link from weather.forecast
    where woeid in (select woeid from geo.places(1) where text="${city}") and u='c'`;
    return this.http.get(`http://query.yahooapis.com/v1/public/yql?q=${yql}&format=json`)
      .pipe(
        map(this.parseData(city)),
        retryWhen(errors =>
          errors.pipe(
            delayWhen(() => timer(1000))
          )
        )
      );
  }

  private parseData(name: string) {
    return (result: any) => {
      if (result.query.results !== null) {
        const data = result.query.results.channel;
        return {
          name: name,
          data: {
            temp: data.item.condition.temp,
            text: data.item.condition.text,
            link: data.link.split('*')[1],
            icon: this.retrieveIcon(data.item.description)
          }
        };
      } else {
        throw new Error('Ooops :( yahoo fucked thi up');
      }
    };
  }

  private retrieveIcon(description: string) {
    const match = description.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);
    return match[1] ? match[1] : null;
  }

}
