import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import {
  TableComponentCommonColumns,
  TableComponentHeaderObject,
  TableComponentTypeColumn,
} from './table-component';
import { commonHeaders } from './table-component.constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  imports: [CommonModule, MatIconModule],
  standalone: true,
})
export class TableComponent<T> {
  @Input() columns: TableComponentTypeColumn<T>[] = [];
  @Input() commonColumns: TableComponentCommonColumns = {};
  @Input() data: T[] = [];
  @Output() onDelete: EventEmitter<T> = new EventEmitter<T>();
  @Output() onEdit: EventEmitter<T> = new EventEmitter<T>();
  commonHeaders: TableComponentHeaderObject<string> = commonHeaders;

  constructor(public readonly dialogService: DialogService) {}

  editItem(item: T) {
    this.onEdit.emit(item);
  }

  deleteItem(item: T) {
    this.onDelete.emit(item);
  }
}
