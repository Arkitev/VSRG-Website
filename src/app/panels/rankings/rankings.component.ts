import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectDatabaseService } from 'src/app/authorization/connect-database.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

export interface ScoreModel {
  rank: number;
  username: string;
  nickname: string;
  score: number;
  time: string;
  proof: string;
}

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selectForm: FormGroup;
  rankingColumns: string[] = ['rank', 'username', 'nickname', 'score', 'time', 'proof'];
  scores = [];
  rank = [];
  scoresSource: MatTableDataSource<ScoreModel>;
  noScores: boolean;
  categories = [
    {id: 0, name: 'osu!mania 4k - Reform Dans'},
    {id: 1, name: 'Beatmania IIDX - Single Play'},
    {id: 2, name: 'Lunatic Rave 2 - BMS'},
    {id: 3, name: 'Dance Dance Revolution - Single Play'},
    {id: 4, name: 'Sound Voltex - New Dans'}
  ];
  category: string = this.categories[0].name;
  // tslint:disable-next-line: max-line-length
  omDans = ['INTRO 1st', 'INTRO 2nd', 'INTRO 3rd', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  // tslint:disable-next-line: max-line-length
  bmsDans = ['7th Kyu', '6th Kyu', '5th Kyu', '4th Kyu', '3rd Kyu', '2nd Kyu', '1st Kyu', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Chuuden', 'Kaiden'];
  // tslint:disable-next-line: max-line-length
  lrDans = ['1st Normal', '2nd Normal', '3rd Normal', '4th Normal', '5th Normal', '6th Normal', '7th Normal', '8th Normal', '9th Normal', '10th Normal', '1st Insane', '2nd Insane', '3rd Insane', '4th Insane', '5th Insane', '6th Insane', '7th Insane', '8th Insane', '9th Insane', '10th Insane', 'Kaiden', 'Overjoy'];
  ddrDans = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Kaiden'];
  sdvxDans = ['Lv.01', 'Lv.02', 'Lv.03', 'Lv.04', 'Lv.05', 'Lv.06', 'Lv.07', 'Lv.08', 'Lv.09', 'Lv.10', 'Lv.11', 'Lv.∞'];
  dans = this.omDans;
  dan = this.omDans[0];
  isCategoryOM = true;

  constructor(private formBuilder: FormBuilder, private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.selectForm = this.formBuilder.group({
      id: [],
      categoryControl: [],
      danControl: []
    });
    this.setRanking();
  }

  protected onChangeCategory(category: any) {
    switch (category) {
      case (this.categories[0].name): {
        this.dans = this.omDans;
        this.dan = this.omDans[0];
        this.isCategoryOM = true;
        break;
      }
      case (this.categories[1].name): {
        this.dans = this.bmsDans;
        this.dan = this.bmsDans[0];
        this.isCategoryOM = false;
        break;
      }
      case (this.categories[2].name): {
        this.dans = this.lrDans;
        this.dan = this.lrDans[0];
        this.isCategoryOM = false;
        break;
      }
      case (this.categories[3].name): {
        this.dans = this.ddrDans;
        this.dan = this.ddrDans[0];
        this.isCategoryOM = false;
        break;
      }
      case (this.categories[4].name): {
        this.dans = this.sdvxDans;
        this.dan = this.sdvxDans[0];
        this.isCategoryOM = false;
        break;
      }
    }
    this.setRanking();
  }

  protected setRanking() {
    const scoreFilters = {
      category: this.category,
      dan: this.dan
    };
    this.apiService.getScoresToRanking(scoreFilters).subscribe((data: any) => {
      if (!data.noScores) {
        this.scores = data;
        this.sortByRank();
      } else {
        this.scores = [];
      }
      this.noScores = data.noScores;
      this.scoresSource = new MatTableDataSource(this.scores);
      this.scoresSource.sort = this.sort;
      this.scoresSource.paginator = this.paginator;
    });
  }

  protected sortByRank() {
    this.scores.forEach(function(score, index) {
      if (this[index].score.includes('%')) {
        this[index].score = this[index].score.slice(0, -1);
      } else {
        this[index].score = this[index].score.slice(0, -4);
      }
    }, this.scores);
    this.scores.sort((a, b) => {
      return a.score - b.score;
    });
    this.scores.reverse();
    for (let i = 0; i <= this.scores.length; i++) {
      this.rank[i] = i + 1;
    }
    this.scores.forEach((obj, i) => obj.rank = this.rank[i]);
  }

}
