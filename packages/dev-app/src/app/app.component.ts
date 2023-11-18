import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
    private fb: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.form = this.fb.group({
      enableVerificationCode: [false],
      appearance: ['fill'],
      placeholder: ['请输入验证码'],
    });
    this.iconRegistry.addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/github-circle-white-transparent.svg'));
  }

  verificationCodeChange() {
    console.log('hello world');
    // this.enableVerificationCodeFormControl.patchValue(false);
  }

}
