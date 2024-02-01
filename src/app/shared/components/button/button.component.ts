import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
  imports: [CommonModule],
  standalone: true,
})
export class ButtonComponent {
  @Input()
  label!: string;
}
