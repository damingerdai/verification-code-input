import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VerificationCodeInputComponent } from './verification-code-input.component';



@NgModule({
  declarations: [
    VerificationCodeInputComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    VerificationCodeInputComponent
  ]
})
export class VerificationCodeInputModule { }
