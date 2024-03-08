import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCardDisplayComponent } from './meeting-card-display.component';

describe('MeetingCardDisplayComponent', () => {
  let component: MeetingCardDisplayComponent;
  let fixture: ComponentFixture<MeetingCardDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingCardDisplayComponent]
    });
    fixture = TestBed.createComponent(MeetingCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
