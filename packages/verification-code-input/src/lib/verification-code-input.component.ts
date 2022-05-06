import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, take } from 'rxjs';
 

@Component({
  selector: 'verification-code-input',
  templateUrl: './verification-code-input.component.html',
  styleUrls: ['./verification-code-input.component.scss'],
})
export class VerificationCodeInputComponent {

  private _enableVerificationCode: boolean;

  @Input()
  public set enableVerificationCode(_enableVerificationCode: boolean) {
    this._enableVerificationCode = coerceBooleanProperty(_enableVerificationCode);
  }

  public get enableVerificationCode() {
    return this._enableVerificationCode;
  }

  @Output()
  public verificationCodeChange = new EventEmitter();

  public verificationCodeMsg: string = '获取验证码';
  
  constructor() {
    this._enableVerificationCode = false;
  }

  clickVerificationCodeButton() {
    this.verificationCodeMsg = "60秒后可重发";
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(59));
    this.verificationCodeChange.next(undefined);
    takeFourNumbers.subscribe({
      next: (x) => {
        this.verificationCodeMsg = (59 - x) + "秒后可重发";
        this._enableVerificationCode = false;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.verificationCodeMsg = "重新发送验证码";
        this._enableVerificationCode = true;
      }
    });
  }
}
