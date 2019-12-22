import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundvoltexComponent } from './soundvoltex.component';

describe('SoundvoltexComponent', () => {
  let component: SoundvoltexComponent;
  let fixture: ComponentFixture<SoundvoltexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundvoltexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundvoltexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
