import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
})
export class DialogComponent {
  @Input() size: string = 'lg';
  // IMPROVEMENT: use directives instead of this component
}
