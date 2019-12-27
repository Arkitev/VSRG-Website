import { Component, OnInit } from '@angular/core';
import { ConnectDatabaseService } from 'src/app/authorization/connect-database.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: any;

  constructor(private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.players = Object.values(data);
    });
  }

}
