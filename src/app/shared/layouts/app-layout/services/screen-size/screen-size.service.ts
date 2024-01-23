import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

export enum MediaQueries {
  xsmall = '(max-width: 600px)',
  small = '(max-width: 960px)',
  medium = '(max-width: 1280px)',
  large = '(max-width: 1920px)',
  xlarge = '(min-width: 1920px)',
}

export type ScreenSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'unknown';

@Injectable({
  providedIn: null,
})
export class ScreenSizeService {
  private _screenSize$ = new BehaviorSubject<ScreenSize>('unknown');
  private _destroyed$ = new Subject<void>();

  private _mediaQueriesMap = new Map<string, ScreenSize>([
    [MediaQueries.xsmall, 'xsmall'],
    [MediaQueries.small, 'small'],
    [MediaQueries.medium, 'medium'],
    [MediaQueries.large, 'large'],
    [MediaQueries.xlarge, 'xlarge'],
  ]);

  constructor(private _breakpointObserver: BreakpointObserver) {
    this._breakpointObserver
      .observe(Array.from(this._mediaQueriesMap.keys()))
      .pipe(takeUntil(this._destroyed$))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const size = this._mediaQueriesMap.get(query) || 'unknown';
            this._screenSize$.next(size);
            return;
          }
        }
      });
  }

  get screenSize$(): Observable<ScreenSize> {
    return this._screenSize$.asObservable();
  }

  get screenSize(): ScreenSize {
    return this._screenSize$.getValue();
  }

  destroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  matchEqualOrAbove(screenSize: ScreenSize): boolean {
    const _size = this.screenSize;
    for (const size of this._mediaQueriesMap.values()) {
      if (size === screenSize) return true;
      if (_size === size) return false;
    }
    return false;
  }

  matchEqualOrBelow(screenSize: ScreenSize): boolean {
    const _size = this.screenSize;
    for (const size of this._mediaQueriesMap.values()) {
      if (_size === size) return true;
      if (size === screenSize) return false;
    }
    return false;
  }
}
