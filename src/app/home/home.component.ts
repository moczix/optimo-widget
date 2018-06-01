import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  locations = ['Lodz', 'Berlin', 'Londyn', 'Warszawa', 'Nowy York'];

  shuffleNumber = 3;

  refreshInterval = 10000;

  shuffleInterval = 60000;

  constructor() { }

  ngOnInit() {
  }

}
