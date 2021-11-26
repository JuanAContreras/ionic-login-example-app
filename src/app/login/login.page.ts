import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  passwordMask = false;
  formValidation = false;

  constructor(public FormBuilder: FormBuilder) {
    this.loginForm = this.FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required, Validators.minLength(5)]],
      remember: [false, []]
    });
  }


  ngOnInit() {}

  /**
   * Habilita o desabílita la mascara de password.
   */
  public show_password() {
    this.passwordMask = !this.passwordMask;
  }

  /**
   * Realiza la acción de login.
   */
  public login() {
    this.formValidation = true;
    if (this.loginForm.valid){
      console.log(`OK (Recordar: ${this.loginForm.controls.remember.value})`);
    }
  }

  public formIsValid(input: String) {
    if(this.formValidation){
      switch (input) {
        case 'email-required':
          return this.loginForm.controls.email.errors != null ? this.loginForm.controls.email.errors.required : false;

        case 'email-format':
          return this.loginForm.controls.email.errors != null ? this.loginForm.controls.email.errors.email : false;

        case 'pass-required':
          return this.loginForm.controls.pass.errors != null ? this.loginForm.controls.pass.errors.required : false;

        case 'pass-length':
          return this.loginForm.controls.pass.errors != null ? this.loginForm.controls.pass.errors.minlength : false;
      }
    }
  }
}
