import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs/programs.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProgramsComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    TableComponent,
  ],
})
export class ProgramsModule {}
