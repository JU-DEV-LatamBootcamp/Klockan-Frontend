import { Injectable } from '@angular/core';
import { AppLayoutStream } from '../../streams/app-layout/app-layout.stream';
import { OPanelBridgeStream } from '../../streams/o-panel-bridge/o-panel-bridge.stream';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';

@Injectable({
  providedIn: null,
})
export class OPanelService {
  constructor(
    private readonly _appLayoutStream: AppLayoutStream,
    private readonly _oPanelBridgeStream: OPanelBridgeStream
  ) {}

  openFromComponent<T>(component: ComponentType<T>) {
    const componentPortal = new ComponentPortal<T>(component);
    this._oPanelBridgeStream.portal = componentPortal;
  }

  openFromTemplate(template: TemplatePortal) {
    this._oPanelBridgeStream.portal = template;
  }

  toggle() {
    const oPanel = this._appLayoutStream.oPanel;
    if (!oPanel) return;

    oPanel.toggle();
  }
}
