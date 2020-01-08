import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectDatabaseService } from 'src/app/authorization/connect-database.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

export interface Player {
  username: string;
  mainGame: string;
  approvedScoresQuantity: number;
  registrationTime: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginatorPlayers: MatPaginator;
  players: any;
  playersSource: MatTableDataSource<Player>;
  obsPlayers: Observable<any>;

  constructor(private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.players = Object.values(data);
      this.playersSource = new MatTableDataSource<Player>(this.players);
      this.playersSource.paginator = this.paginatorPlayers;
      this.obsPlayers = this.playersSource.connect();
    });
  }

}
