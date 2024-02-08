import { Component } from '@angular/core';
import { sidebarLinks } from './sidebar-component.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  links = sidebarLinks;
}
