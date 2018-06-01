import {NgModule} from '@angular/core';
import {WeatherComponent} from './weather.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './weather.service';

@NgModule({
  declarations: [
    WeatherComponent,
  ],
  exports: [
    WeatherComponent
  ],
  imports: [
    HttpClientModule,
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
