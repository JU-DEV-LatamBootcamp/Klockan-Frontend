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
  TableComponentColumn,
} from './table-component';
import { commonHeaders } from './table-component.constants';
import { MatButtonModule } from '@angular/material/button';

// TODO: actions when no action is enable
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
  standalone: true,
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  @Input() columns: TableComponentTypeColumn<T>[] = [];
  @Input() commonColumns: TableComponentCommonColumns = {};
  @Input() data: T[] = [];
  @Output() onRowDelete: EventEmitter<T> = new EventEmitter<T>();
  @Output() onRowEdit: EventEmitter<T> = new EventEmitter<T>();
  @Output() rowInspect: EventEmitter<T> = new EventEmitter<T>();
  dataSource!: MatTableDataSource<T>;
  headerRow: string[] = [];
  commonHeaders: TableComponentHeaderObject<string> = commonHeaders;
  sortOptions: TableComponentColumn = { selector: '' };

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public readonly dialogService: DialogService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.buildHeaderRow();
    this.buildSortOptions();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  buildHeaderRow() {
    this.headerRow = this.columns.map(column => column.selector as string);
    if (this.commonColumns.actions) {
      this.headerRow.push(this.commonHeaders.actions);
    }
  }

  buildSortOptions() {
    const typeColumn = this.columns.reduce<TableComponentTypeColumn<T> | null>(
      (found, column) => (found ? found : column.sort?.active ? column : null),
      null
    );

    this.sortOptions = {
      selector:
        typeColumn?.selector.toString() || this.columns[0].selector.toString(),
      sort: {
        active: true,
        direction: typeColumn?.sort?.direction || 'asc',
      },
    };
  }

  editRow(row: T) {
    this.onRowEdit.emit(row);
  }

  deleteRow(row: T) {
    this.onRowDelete.emit(row);
  }

  inspectRow(row: T) {
    this.rowInspect.emit(row);
  }
}
