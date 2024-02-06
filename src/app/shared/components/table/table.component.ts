import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  imports: [CommonModule, MatIconModule],
  standalone: true,
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Output() deleteItemEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() editItemEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(public readonly dialogService: DialogService) {}

  editItem(item: any) {
    this.editItemEvent.emit(item);
  }

  deleteItem(item: any) {
    this.deleteItemEvent.emit(item);
  }
}
