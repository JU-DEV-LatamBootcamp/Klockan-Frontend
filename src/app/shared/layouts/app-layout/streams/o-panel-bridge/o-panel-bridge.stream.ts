import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Portal } from '../../types/portal';

@Injectable({
  providedIn: null,
})
export class OPanelBridgeStream {
  private _portal$ = new BehaviorSubject<Portal | null>(null);

  constructor() {}

  get portal$() {
    return this._portal$.asObservable();
  }

  set portal(portal: Portal | null) {
    this._portal$.next(portal);
  }

  get portal() {
    return this._portal$.getValue();
  }
}
