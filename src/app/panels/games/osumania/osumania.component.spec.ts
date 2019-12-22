import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsumaniaComponent } from './osumania.component';

describe('OsumaniaComponent', () => {
  let component: OsumaniaComponent;
  let fixture: ComponentFixture<OsumaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsumaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsumaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
