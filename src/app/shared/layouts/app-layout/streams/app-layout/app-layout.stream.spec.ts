import { TestBed } from '@angular/core/testing';

import { AppLayoutStream } from './app-layout.stream';

describe('AppLayoutStream', () => {
  let service: AppLayoutStream;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLayoutStream);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
