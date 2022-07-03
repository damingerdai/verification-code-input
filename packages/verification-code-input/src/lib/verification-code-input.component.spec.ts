import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VerificationCodeInputModule } from './verification-code-input.module';

import { VerificationCodeInputComponent } from './verification-code-input.component';
import { By } from '@angular/platform-browser';

describe('VerificationCodeInputComponent', () => {
  let component: VerificationCodeInputComponent;
  let fixture: ComponentFixture<VerificationCodeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, VerificationCodeInputModule],
      declarations: [VerificationCodeInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the native button element', () => {
    const buttonNativeElement = fixture.nativeElement.querySelector('button');
    component.initialEnableVerificationCode = false;
    expect(buttonNativeElement.disabled)
      .withContext('Expected button to be disabled')
      .toBeTruthy();

    component.initialEnableVerificationCode = true;
    fixture.detectChanges();

    expect(buttonNativeElement.disabled)
      .withContext('Expected button not to be disabled')
      .toBeFalsy();
  });

  it('click verification code button then interval 60 seconds', fakeAsync(() => {
    const buttonDebugElement = fixture.debugElement.query(By.css('button'))!;
    expect(
      (buttonDebugElement.nativeElement as HTMLButtonElement)?.innerText
    ).toContain('获取验证码');
    let maxSeconds = 60;
    component.initialEnableVerificationCode = true;
    component.maxSeconds = maxSeconds;
    component.clickVerificationCodeButton();
    fixture.detectChanges();

    expect(component.enableVerificationCode)
      .withContext('Expected button not to be disabled')
      .toBeFalsy();
    expect(component.verificationCodeMsg).toContain(`${maxSeconds}秒后可重发`);
    for (let i = 1; i < 60; i++) {
      tick(1000);
      fixture.detectChanges();
      expect(component.verificationCodeMsg).toContain(
        `${maxSeconds - i}秒后可重发`
      );
      expect(component.enableVerificationCode).toBeFalse();
    }
    tick(1000);
    fixture.detectChanges();
    expect(component.verificationCodeMsg).toContain(`重新发送验证码`);
    expect(component.enableVerificationCode).toBeTrue();
  }));
});
