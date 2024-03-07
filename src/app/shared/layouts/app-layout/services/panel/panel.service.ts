import { Injectable } from '@angular/core';
import { AppLayoutStream } from '../../streams/app-layout/app-layout.stream';
import { PanelBridgeStream } from '../../streams/panel-bridge/panel-bridge.stream';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class PanelService {
  private _data$ = new BehaviorSubject<unknown>(null);
  public readonly data$ = this._data$.asObservable();

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
    this._appLayoutStream.panel?.toggle();
  }

  open() {
    this._appLayoutStream.panel?.open();
  }

  close() {
    this._appLayoutStream.panel?.close();
  }

  setData<T>(data: T) {
    this._data$.next(data);
  }

  clearData() {
    this._data$.next(null);
  }
}
