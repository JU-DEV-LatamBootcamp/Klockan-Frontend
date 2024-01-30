import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BaseService } from '../../services/base.service';

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
  @Input() service!: BaseService<any>;

  editarItem(item: any) {
    this.service.edit(item);
  }

  eliminarItem(item: any) {
    this.service.delete(item);
  }
}
