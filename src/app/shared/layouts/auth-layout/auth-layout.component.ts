import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ScreenSizeService } from './services/screen-size/screen-size.service';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent implements OnDestroy {
  constructor(public readonly screenSizeService: ScreenSizeService) {}

  ngOnDestroy() {
    this.screenSizeService.destroy();
  }
}
