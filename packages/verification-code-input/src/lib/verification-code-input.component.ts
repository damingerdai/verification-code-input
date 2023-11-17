import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatFormFieldAppearance, MatFormFieldDefaultOptions,  MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { interval, take } from 'rxjs';


@Component({
  selector: 'verification-code-input',
  templateUrl: './verification-code-input.component.html',
  styleUrls: ['./verification-code-input.component.scss'],
})
export class VerificationCodeInputComponent {

  private _enableVerificationCode: boolean;

  private _maxSeconds: number;

  private _appearance: MatFormFieldAppearance;

  private _placeholder: string;

  @Input()
  public set initialEnableVerificationCode(_enableVerificationCode: boolean) {
    this._enableVerificationCode = coerceBooleanProperty(_enableVerificationCode);
  }

  public set enableVerificationCode(_enableVerificationCode: boolean) {
    this._enableVerificationCode = coerceBooleanProperty(_enableVerificationCode);
  }

  public get enableVerificationCode() {
    return this._enableVerificationCode;
  }

  @Input()
  public set maxSeconds(_maxSeconds: number) {
    this._maxSeconds = coerceNumberProperty(_maxSeconds);
  }

  public get maxSeconds() {
    return isNaN(this._maxSeconds) ? 60 : this._maxSeconds;
  }

  @Input()
  public set appearance(_appearance: MatFormFieldAppearance) {
    this._appearance = _appearance;
  }

  public get appearance() {
    return this._appearance;
  }

  @Input()
  public set placeholder(_placeholder: string) {
    this._placeholder = _placeholder;
  }

  public get placeholder() {
    return this._placeholder;
  }


  @Output()
  public verificationCodeChange = new EventEmitter();

  public verificationCodeMsg: string = '获取验证码';

  constructor(
    @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS)
    private _defaults: MatFormFieldDefaultOptions,
  ) {
    this._enableVerificationCode = false;
    this._maxSeconds = 60;
    // Set the default through here so we invoke the setter on the first run.
    this._appearance = this._defaults?.appearance || 'fill';
    this._placeholder = '';
  }

  clickVerificationCodeButton() {
    this.enableVerificationCode = false;
    this.verificationCodeMsg = `${this._maxSeconds}秒后可重发`;
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(this.maxSeconds));
    this.verificationCodeChange.next(undefined);
    const sub = takeFourNumbers.subscribe({
      next: (x) => {
        this.verificationCodeMsg = (this.maxSeconds - 1 - x) + '秒后可重发';
        this.enableVerificationCode = false;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.verificationCodeMsg = '重新发送验证码';
        this.enableVerificationCode = true;
        if (sub) {
          sub.unsubscribe();
        }
      }
    });
  }

}
