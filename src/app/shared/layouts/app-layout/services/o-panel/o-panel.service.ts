import { Injectable } from '@angular/core';
import { AppLayoutStream } from '../../streams/app-layout/app-layout.stream';
import { OPanelBridgeStream } from '../../streams/o-panel-bridge/o-panel-bridge.stream';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class OPanelService {
  private _data$ = new BehaviorSubject<unknown>(null);
  public readonly data$ = this._data$.asObservable();

  constructor(
    private readonly _appLayoutStream: AppLayoutStream,
    private readonly _oPanelBridgeStream: OPanelBridgeStream
  ) {}

  public get data() {
    return this._data$.getValue();
  }

  openFromComponent<T>(component: ComponentType<T>) {
    const componentPortal = new ComponentPortal<T>(component);
    this._oPanelBridgeStream.portal = componentPortal;
  }

  openFromTemplate(template: TemplatePortal) {
    this._oPanelBridgeStream.portal = template;
  }

  toggle() {
    this._appLayoutStream.oPanel?.toggle();
  }

  open() {
    this._appLayoutStream.oPanel?.open();
  }

  close() {
    this._appLayoutStream.oPanel?.close();
  }

  setData<T>(data: T) {
    this._data$.next(data);
  }

  clearData() {
    this._data$.next(null);
  }
}
