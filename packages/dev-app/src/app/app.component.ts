import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  enableVerificationCodeFormControl: UntypedFormControl;

  title = '验证码输入框';

  constructor(
    private fb: UntypedFormBuilder
  ) {
    this.enableVerificationCodeFormControl = this.fb.control(false);
  }

  verificationCodeChange() {
    console.log('hello world');
    // this.enableVerificationCodeFormControl.patchValue(false);
  }

}
