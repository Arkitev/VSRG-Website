import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectDatabaseService } from 'src/app/authorization/connect-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedGame: string;
  submitScoreForm: FormGroup;
  formDisabled: boolean;
  isLogged = true;
  successScoreSubmit: boolean;
  message: string;
  isCategoryOM = false;

  categories = [
    { name: 'osu!mania 4k - Reform Dans', value: 'osu!mania 4k - Reform Dans', game: 'osu!mania' },
    { name: 'Beatmania IIDX - Single Play', value: 'Beatmania IIDX - Single Play', game: 'Beatmania IIDX' },
    { name: 'Lunatic Rave 2 - BMS', value: 'Lunatic Rave 2 - BMS', game: 'Lunatic Rave 2' },
    { name: 'Dance Dance Revolution - Single Play', value: 'Dance Dance Revolution - Single Play', game: 'Dance Dance Revolution' },
    { name: 'Sound Voltex - New Dans', value: 'Sound Voltex - New Dans', game: 'Sound Voltex' }
  ];

  // tslint:disable-next-line: max-line-length
  omDans = ['INTRO 1st', 'INTRO 2nd', 'INTRO 3rd', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  // tslint:disable-next-line: max-line-length
  bmsDans = ['7th Kyu', '6th Kyu', '5th Kyu', '4th Kyu', '3rd Kyu', '2nd Kyu', '1st Kyu', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Chuuden', 'Kaiden'];
  // tslint:disable-next-line: max-line-length
  lrDans = ['1st Normal', '2nd Normal', '3rd Normal', '4th Normal', '5th Normal', '6th Normal', '7th Normal', '8th Normal', '9th Normal', '10th Normal', '1st Insane', '2nd Insane', '3rd Insane', '4th Insane', '5th Insane', '6th Insane', '7th Insane', '8th Insane', '9th Insane', '10th Insane', 'Kaiden', 'Overjoy'];
  ddrDans = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Kaiden'];
  sdvxDans = ['Lv.01', 'Lv.02', 'Lv.03', 'Lv.04', 'Lv.05', 'Lv.06', 'Lv.07', 'Lv.08', 'Lv.09', 'Lv.10', 'Lv.11', 'Lv.∞'];

  constructor(private formBuilder: FormBuilder, private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.submitScoreForm = this.formBuilder.group({
      id: [],
      category: ['', [Validators.required]],
      dan: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      score: ['', [Validators.required]],
      proof: ['', [Validators.required]]
    });
    if (!window.localStorage.getItem('jwt')) {
      this.submitScoreForm.disable();
      this.formDisabled = true;
      this.isLogged = false;
    } else {
    this.setDefaultForm();
    }
  }

  protected onSubmit() {
    const submitScoreData = {
      category: this.submitScoreForm.controls.category.value,
      dan: this.submitScoreForm.controls.dan.value,
      nickname: this.submitScoreForm.controls.nickname.value,
      score: this.submitScoreForm.controls.score.value,
      proof: this.submitScoreForm.controls.proof.value,
      jwt: window.localStorage.getItem('jwt')
    };

    this.apiService.insertScore(submitScoreData).subscribe((data: any) => {
      this.message = data.message;
      this.successScoreSubmit = data.successScoreSubmit;
    });
  }

  protected onReset() {
    this.submitScoreForm.reset();
    this.setDefaultForm();
    this.message = null;
    this.successScoreSubmit = false;
  }

  protected setDefaultForm() {
    this.apiService.getUserData(window.localStorage.getItem('jwt')).subscribe((data: any) => {
      this.nickname.setValue(data.username);
      this.categories.forEach((category) => {
        switch (data.mainGame) {
          case (category.game): {
            this.category.setValue(category.name);
          }
        }
     });
      if (data.mainGame === 'osu!mania') {
       this.isCategoryOM = true;
     }
    });
  }

  protected onChangeCategory(category: any) {
    if (category === 'osu!mania 4k - Reform Dans') {
      this.isCategoryOM = true;
    } else {
      this.isCategoryOM = false;
    }
  }

  get category() { return this.submitScoreForm.get('category'); }
  get dan() { return this.submitScoreForm.get('dan'); }
  get nickname() { return this.submitScoreForm.get('nickname'); }
  get score() { return this.submitScoreForm.get('score'); }
  get proof() { return this.submitScoreForm.get('proof'); }

}
