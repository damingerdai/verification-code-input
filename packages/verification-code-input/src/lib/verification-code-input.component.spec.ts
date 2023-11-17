import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatLegacyFormFieldAppearance as MatFormFieldAppearance } from '@angular/material/legacy-form-field';
import { VerificationCodeInputModule } from './verification-code-input.module';
import { VerificationCodeInputComponent } from './verification-code-input.component';


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

  it('set appearance style', () => {
    const appearances = ['legacy', 'standard', 'fill', 'outline'] as MatFormFieldAppearance[];
    for (const appearance of appearances) {
      component.appearance = appearance;
      fixture.detectChanges();
      const matFormFieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'))!;
      expect(matFormFieldDebugElement.attributes['ng-reflect-appearance']).toBe(appearance);
      expect(matFormFieldDebugElement.classes[`mat-form-field-appearance-${appearance}`]).toBeTrue();
    }
  })

  it('set placeholder', () => {
    const placeholder = new Date().getTime() + '@daming';
    component.placeholder = placeholder;
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('label'))!;
    expect(labelEl).not.toBeNull();
    expect(labelEl.nativeElement.textContent).toBe(placeholder);
  })
});
