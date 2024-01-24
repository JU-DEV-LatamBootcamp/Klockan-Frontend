import { TestBed } from '@angular/core/testing';

import { OPanelBridgeStream } from './o-panel-bridge.stream';

describe('OPanelBridgeStream', () => {
  let service: OPanelBridgeStream;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OPanelBridgeStream);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
