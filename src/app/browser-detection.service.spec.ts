import {TestBed} from '@angular/core/testing';

import {BrowserDetectionService} from './browser-detection.service';

describe('BrowserDetectionService', () => {
  let service: BrowserDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
