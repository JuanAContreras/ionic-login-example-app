import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  passwordMask = false;
  formValidation = false;

  constructor(private FormBuilder: FormBuilder,
    private platform: Platform) {
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
    if(this.formValidation){
      if (type === 'email-required'){
        return this.loginForm.controls.email.errors != null ? this.loginForm.controls.email.errors.required : false;
      } else if(type === 'email-format'){
        return this.loginForm.controls.email.errors != null ? this.loginForm.controls.email.errors.email : false;
      }
    }
  }

  /**
   * Comprueba que el campo password sea correcto y muestra los errores si existen.
   * @param type
   * @returns
   */
  public passValid(type: string){
    if(this.formValidation){
      if (type === 'pass-required'){
        return this.loginForm.controls.pass.errors != null ? this.loginForm.controls.pass.errors.required : false;
      } else if(type === 'pass-length'){
        return this.loginForm.controls.pass.errors != null ?  this.loginForm.controls.pass.errors.minlength : false;
      }
    }
  }

  /**
   * Devuelve True cuando la SPA esta ejecutandose en un dispositivo móvil.
   */
  public isMobile(){
    return this.platform.platforms().includes('android') || this.platform.platforms().includes('ios');
  }
}
