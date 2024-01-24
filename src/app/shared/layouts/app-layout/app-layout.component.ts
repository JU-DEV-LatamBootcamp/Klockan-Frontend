import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { MatDrawer } from '@angular/material/sidenav';
import { AppLayoutStream } from './streams/app-layout/app-layout.stream';
import { OPanelBridgeStream } from './streams/o-panel-bridge/o-panel-bridge.stream';
import { PanelBridgeStream } from './streams/panel-bridge/panel-bridge.stream';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidebar', { static: false }) private _sidebar?: MatDrawer;
  @ViewChild('panel', { static: false }) private _panel?: MatDrawer;
  @ViewChild('oPanel', { static: false }) private _oPanel?: MatDrawer;

  constructor(
    private readonly _appLayoutStream: AppLayoutStream,
    public readonly panelBridgeStream: PanelBridgeStream,
    public readonly oPanelBridgeStream: OPanelBridgeStream,
    public readonly screenSizeService: ScreenSizeService
  ) {}

  ngAfterViewInit(): void {
    this._appLayoutStream.sidebar = this._sidebar || null;
    this._appLayoutStream.panel = this._panel || null;
    this._appLayoutStream.oPanel = this._oPanel || null;
  }

  ngOnDestroy() {
    this.screenSizeService.destroy();
  }
}
