import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  enableVerificationCodeFormControl: FormControl;

  title = '验证码输入框';

  constructor(
    private fb: FormBuilder
  ) {
    this.enableVerificationCodeFormControl = this.fb.control(false);
  }

  verificationCodeChange() {
    console.log('hello world');
    // this.enableVerificationCodeFormControl.patchValue(false);
  }

}
