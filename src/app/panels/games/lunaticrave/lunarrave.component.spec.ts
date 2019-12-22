import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunaticraveComponent } from './lunaticrave.component';

describe('LunaticraveComponent', () => {
  let component: LunaticraveComponent;
  let fixture: ComponentFixture<LunaticraveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunaticraveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunaticraveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
