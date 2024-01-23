import { TestBed } from '@angular/core/testing';

import { OPanelService } from './o-panel.service';

describe('OPanelService', () => {
  let service: OPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
