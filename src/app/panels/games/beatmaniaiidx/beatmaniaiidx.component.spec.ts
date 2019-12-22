import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmaniaiidxComponent } from './beatmaniaiidx.component';

describe('BeatmaniaiidxComponent', () => {
  let component: BeatmaniaiidxComponent;
  let fixture: ComponentFixture<BeatmaniaiidxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatmaniaiidxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatmaniaiidxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
