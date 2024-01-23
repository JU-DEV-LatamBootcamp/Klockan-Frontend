import { Injectable } from '@angular/core';
import { AppLayoutStream } from '../../streams/app-layout/app-layout.stream';
import { PanelBridgeStream } from '../../streams/panel-bridge/panel-bridge.stream';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';

@Injectable({
  providedIn: null,
})
export class PanelService {
  constructor(
    private readonly _appLayoutStream: AppLayoutStream,
    private readonly _panelBridgeStream: PanelBridgeStream
  ) {}

  openFromComponent<T>(component: ComponentType<T>) {
    const componentPortal = new ComponentPortal<T>(component);
    this._panelBridgeStream.portal = componentPortal;
  }

  openFromTemplate(template: TemplatePortal) {
    this._panelBridgeStream.portal = template;
  }

  clear() {
    this._panelBridgeStream.portal = null;
  }

  toggle() {
    const panel = this._appLayoutStream.panel;
    if (!panel) return;

    panel.toggle();
  }
}
