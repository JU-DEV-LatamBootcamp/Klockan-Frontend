import { Injectable } from '@angular/core';
import { AppLayoutStream } from '../../streams/app-layout/app-layout.stream';
import { ScreenSizeService } from '../screen-size/screen-size.service';

@Injectable({
  providedIn: null,
})
export class SidebarService {
  constructor(
    private readonly _screenSizeService: ScreenSizeService,
    private readonly _appLayoutStream: AppLayoutStream
  ) {}

  toggle() {
    const sidebar = this._appLayoutStream.sidebar;
    if (!sidebar) return;

    if (this._screenSizeService.matchEqualOrAbove('large') && sidebar.opened)
      return;

    sidebar.toggle();
  }

  init() {
    const sidebar = this._appLayoutStream.sidebar;
    if (!sidebar) return;

    if (this._screenSizeService.matchEqualOrAbove('large')) {
      if (!sidebar.opened) {
        sidebar.open();
      }

      return;
    }

    if (sidebar.opened) {
      sidebar.close();
    }
  }
}
