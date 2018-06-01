import {HomeComponent} from '../home/home.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
