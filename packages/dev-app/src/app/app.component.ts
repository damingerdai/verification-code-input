import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected form: FormGroup;

  protected title = '验证码输入框';

  public get enableVerificationCode() {
    return this.form.get('enableVerificationCode');
  }

  public get appearance() {
    return this.form.get('appearance');
  }

  public get placeholder() {
    return this.form.get('placeholder');
  }


  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      enableVerificationCode: [false],
      appearance: ['legacy'],
      placeholder: ['请输入验证码'],
    });

  }

  verificationCodeChange() {
    console.log('hello world');
    // this.enableVerificationCodeFormControl.patchValue(false);
  }

}
