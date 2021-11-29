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

  constructor(private FormBuilder: FormBuilder) {
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

  /**
   * Comprueba que el campo email sea correcto y muestra los errores si existen.
   * @param type
   * @returns
   */
  public emailValid(type: string){
    if(this.formValidation && this.loginForm.controls.email.errors != null){
      if (type === 'email-required'){
        return this.loginForm.controls.email.errors.required;
      } else if(type === 'email-format'){
        this.loginForm.controls.email.errors.email
      }
    }
  }

  /**
   * Comprueba que el campo password sea correcto y muestra los errores si existen.
   * @param type
   * @returns
   */
  public passValid(type: string){
    if(this.formValidation && this.loginForm.controls.email.errors != null){
      if (type === 'pass-required'){
        return this.loginForm.controls.pass.errors.required;
      } else if(type === 'pass-length'){
        this.loginForm.controls.pass.errors.minlength;
      }
    }
  }
}
