import { Component, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/layouts/app-layout/services/screen-size/screen-size.service';
import { SidebarService } from 'src/app/shared/layouts/app-layout/services/sidebar/sidebar.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.sass'],
})
export class MainHeaderComponent {
  @Input() title: string = '';

  constructor(
    public readonly screenSizeService: ScreenSizeService,
    public readonly sidebarService: SidebarService
  ) {}
}
