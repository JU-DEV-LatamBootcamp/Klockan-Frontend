import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
  imports: [CommonModule, MatIconModule, MatTableModule, MatSortModule],
  standalone: true,
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  @Input() columns: TableComponentTypeColumn<T>[] = [];
  @Input() commonColumns: TableComponentCommonColumns = {};
  @Input() data: T[] = [];
  @Output() onDelete: EventEmitter<T> = new EventEmitter<T>();
  @Output() onEdit: EventEmitter<T> = new EventEmitter<T>();
  commonHeaders: TableComponentHeaderObject<string> = commonHeaders;
  dataSource!: MatTableDataSource<T>;
  headerRow: string[] = [];

  @ViewChild(MatSort) sort?: MatSort;

  constructor(public readonly dialogService: DialogService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.updateHeaderRow();
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  updateHeaderRow() {
    this.headerRow = this.columns.map(column => column.selector as string);
    if (this.commonColumns.actions) {
      this.headerRow.push('actions');
    }
  }

  // TODO: change item for row
  editItem(item: T) {
    this.onEdit.emit(item);
  }

  deleteItem(item: T) {
    this.onDelete.emit(item);
  }
}
