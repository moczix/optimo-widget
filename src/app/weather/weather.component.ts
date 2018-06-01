import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {forkJoin, interval, Subscription, timer} from 'rxjs';
import {mergeMap, startWith, takeUntil, tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  @Input()
  locations: Array<string>;

  @Input()
  shuffleNumber: number;

  @Input()
  refreshInterval: number;

  @Input()
  shuffleInterval: number;

  sub: Subscription;

  conditions = [];

  @Input()
  debug = false;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {

    if (this.shuffleNumber > this.locations.length) {
      throw new Error('shuffleNumber cannot be greater then locations length');
    }

    this.getWeather();

  }

  shuffledLocations(): Array<string> {
    return this.locations
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  getWeather() {
    const locations = this.shuffledLocations();
    this.sub = interval(this.refreshInterval)
      .pipe(
        startWith(0),
        mergeMap(() => forkJoin(locations.slice(0, this.shuffleNumber).map(city => this.weatherService.getWeather(city)))),
        takeUntil(timer(this.shuffleInterval)),
        tap(this.debugable)
      )
      .subscribe(
        res => this.conditions = res,
        err => { },
        () => this.getWeather()
      );
  }

  debugable(res) {
    if (this.debug) {
      console.log(res);
    }
  }

}
