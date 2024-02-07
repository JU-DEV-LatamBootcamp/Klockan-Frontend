import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';

export enum TableComponentCommonHeaders {
  actions = 'ACTIONS',
  index = 'INDEX',
}

export type TableComponentTypeHeaders<T> = keyof T;

export type TableComponentHeaders<T> =
  | TableComponentCommonHeaders
  | TableComponentTypeHeaders<T>;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  imports: [CommonModule, MatIconModule],
  standalone: true,
})
export class TableComponent<T> implements OnInit {
  @Input() headers: TableComponentHeaders<T>[] = [];
  @Input() data: T[] = [];
  @Output() onDelete: EventEmitter<T> = new EventEmitter<T>();
  @Output() onEdit: EventEmitter<T> = new EventEmitter<T>();
  typeHeaders: TableComponentTypeHeaders<T>[] = [];

  constructor(public readonly dialogService: DialogService) {}

  ngOnInit(): void {
    this.typeHeaders = this.headers.reduce(
      (headers: TableComponentTypeHeaders<T>[], header) => {
        if (header as keyof T) {
          headers.push(header as keyof T);
        }
        return headers;
      },
      []
    );
  }

  editItem(item: T) {
    this.onEdit.emit(item);
  }

  deleteItem(item: T) {
    this.onDelete.emit(item);
  }
}
