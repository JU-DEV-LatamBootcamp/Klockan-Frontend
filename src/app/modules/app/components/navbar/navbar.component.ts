import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ScreenSizeService } from 'src/app/shared/layouts/app-layout/services/screen-size/screen-size.service';
import { SidebarService } from 'src/app/shared/layouts/app-layout/services/sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  constructor(
    private readonly authService: AuthService,
    public readonly screenSizeService: ScreenSizeService,
    public readonly sidebarService: SidebarService
  ) {}

  async onLogOut() {
    await this.authService.logOut();
  }
}
