import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, take } from 'rxjs';
 

@Component({
  selector: 'verification-code-input',
  templateUrl: './verification-code-input.component.html',
  styleUrls: ['./verification-code-input.component.scss'],
})
export class VerificationCodeInputComponent {

  private _enableVerificationCode: boolean;

  private _maxSeconds: number;

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

  public set maxSeconds(_maxSeconds: number) {
    this._maxSeconds = coerceNumberProperty(_maxSeconds);
  }

  @Output()
  public verificationCodeChange = new EventEmitter();

  public verificationCodeMsg: string = '获取验证码';
  
  constructor() {
    this._enableVerificationCode = false;
    this._maxSeconds = 60;
  }

  clickVerificationCodeButton() {
    this.enableVerificationCode = false;
    this.verificationCodeMsg = `${this._maxSeconds}秒后可重发`;
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(this.maxSeconds -1));
    this.verificationCodeChange.next(undefined);
    takeFourNumbers.subscribe({
      next: (x) => {
        this.verificationCodeMsg = (this.maxSeconds -1 - x) + '秒后可重发';
        this.enableVerificationCode = false;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.verificationCodeMsg = '重新发送验证码';
        this.enableVerificationCode = true;
      }
    });
  }
}
