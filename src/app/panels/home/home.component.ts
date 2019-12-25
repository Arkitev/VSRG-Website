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

  categories = [
    { name: 'osu!mania 4k - Reform Dans', value: 'osu!mania 4k - Reform Dans' },
    { name: 'Beatmania IIDX - Single Play', value: 'Beatmania IIDX - Single Play' },
    { name: 'Lunatic Rave 2 - BMS', value: 'Lunatic Rave 2 - BMS' },
    { name: 'Dance Dance Revolution - Single Play', value: 'Dance Dance Revolution - Single Play' },
    { name: 'Sound Voltex - New Dans', value: 'Sound Voltex - New Dans' }
  ];

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

    this.submitScoreForm.get('dan').disable();

    if (!window.localStorage.getItem('jwt')) {
      this.submitScoreForm.disable();
      this.formDisabled = true;
      this.isLogged = false;
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
    this.submitScoreForm.get('dan').disable();
    this.message = null;
    this.successScoreSubmit = false;
  }

  protected enableDanControl() {
    this.submitScoreForm.get('dan').enable();
  }

  get category() { return this.submitScoreForm.get('category'); }
  get dan() { return this.submitScoreForm.get('dan'); }
  get nickname() { return this.submitScoreForm.get('nickname'); }
  get score() { return this.submitScoreForm.get('score'); }
  get proof() { return this.submitScoreForm.get('proof'); }

}
