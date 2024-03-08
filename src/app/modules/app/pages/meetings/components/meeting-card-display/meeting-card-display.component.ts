import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meeting, MeetingCardData } from 'src/app/shared/models/Meeting';

@Component({
  selector: 'app-meeting-card-display',
  templateUrl: './meeting-card-display.component.html',
  styleUrls: ['./meeting-card-display.component.sass'],
})
export class MeetingCardDisplayComponent {
  @Input() meetings: MeetingCardData[] | undefined;
  @Output() onMeetingEdit: EventEmitter<MeetingCardData> = new EventEmitter<MeetingCardData>();

  hoveredMeetingIndex: number | null = null;

  onMouseEnter(index: number) {
    this.hoveredMeetingIndex = index;
  }

  onMouseLeave() {
    this.hoveredMeetingIndex = null;
  }

  editMeeting(event: Event, meeting: MeetingCardData) {
    event.stopPropagation();
    this.onMeetingEdit.emit(meeting);
  }
}
