import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass'],
  standalone: true,
})
export class NotificationComponent {
  // IMPROVEMENT: use directives instead of this component
  @Input('message') message?: string;
}
