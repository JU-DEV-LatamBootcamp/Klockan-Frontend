import { Component } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/layouts/app-layout/services/screen-size/screen-size.service';
import { SidebarService } from 'src/app/shared/layouts/app-layout/services/sidebar/sidebar.service';

@Component({
  selector: 'app-composed-layout',
  templateUrl: './composed-layout.component.html',
  styleUrls: ['./composed-layout.component.sass'],
})
export class ComposedLayoutComponent {
  constructor(
    public readonly screenSizeService: ScreenSizeService,
    public readonly sidebarService: SidebarService
  ) {}
}
