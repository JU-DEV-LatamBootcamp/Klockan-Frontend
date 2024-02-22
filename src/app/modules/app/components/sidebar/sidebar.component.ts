import { Component } from '@angular/core';
import { sidebarLinks } from './sidebar-component.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  links = sidebarLinks;

  constructor(private readonly authService: AuthService) {}

  onLogOut() {
    this.authService.logOut();
  }
}
