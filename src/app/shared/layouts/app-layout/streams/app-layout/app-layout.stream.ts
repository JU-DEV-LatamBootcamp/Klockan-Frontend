import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class AppLayoutStream {
  private _sidebar$ = new BehaviorSubject<MatDrawer | null>(null);
  private _panel$ = new BehaviorSubject<MatDrawer | null>(null);
  private _oPanel$ = new BehaviorSubject<MatDrawer | null>(null);

  constructor() {}

  get sidebar$() {
    return this._sidebar$.asObservable();
  }

  set sidebar(sidebar: MatDrawer | null) {
    this._sidebar$.next(sidebar);
  }

  get sidebar() {
    return this._sidebar$.getValue();
  }

  get panel$() {
    return this._panel$.asObservable();
  }

  set panel(panel: MatDrawer | null) {
    this._panel$.next(panel);
  }

  get panel() {
    return this._panel$.getValue();
  }

  get oPanel$() {
    return this._oPanel$.asObservable();
  }

  set oPanel(oPanel: MatDrawer | null) {
    this._oPanel$.next(oPanel);
  }

  get oPanel() {
    return this._oPanel$.getValue();
  }
}
