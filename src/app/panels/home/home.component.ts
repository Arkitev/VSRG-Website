import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public selectedGame: string;

  games = [
    { name: 'osu!mania 4k - Reform Dans', value: 'osu!mania 4k - Reform Dans' },
    { name: 'BeatmaniaIIDX - Single Play', value: 'BeatmaniaIIDX - Single Play' },
    { name: 'Lunatic Rave 2 - BMS', value: 'Lunatic Rave 2 - BMS' },
    { name: 'Dance Dance Revolution - Single Play', value: 'Dance Dance Revolution - Single Play' },
    { name: 'Sound Voltex - New Dans', value: 'Sound Voltex - New Dans' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
