import { TestBed } from '@angular/core/testing';

import { PanelBridgeStream } from './panel-bridge.stream';

describe('PanelBridgeStream', () => {
  let service: PanelBridgeStream;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelBridgeStream);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
