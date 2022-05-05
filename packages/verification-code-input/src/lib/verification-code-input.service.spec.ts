import { TestBed } from '@angular/core/testing';

import { VerificationCodeInputService } from './verification-code-input.service';

describe('VerificationCodeInputService', () => {
  let service: VerificationCodeInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationCodeInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
