import { TestBed, inject } from '@angular/core/testing';

import { Oauthv2TokenHandlerService } from './oauthv2-token-handler.service';

describe('Oauthv2TokenHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Oauthv2TokenHandlerService]
    });
  });

  it('should be created', inject([Oauthv2TokenHandlerService], (service: Oauthv2TokenHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
