import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCodeInputComponent } from './verification-code-input.component';

describe('VerificationCodeInputComponent', () => {
  let component: VerificationCodeInputComponent;
  let fixture: ComponentFixture<VerificationCodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationCodeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
