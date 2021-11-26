import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { logging } from 'selenium-webdriver';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('La página debe ser creada', () => {
    expect(component).toBeTruthy();
  });

  it('Todos los componentes deben ser renderizados', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const logo = compiled.querySelector('ion-img');
    const personIcon = compiled.querySelector('ion-icon[name=person]');
    const emailInput = compiled.querySelector('ion-input#email');
    const keyIcon = compiled.querySelector('ion-icon[name=key]');
    const passInput = compiled.querySelector('ion-input#pass');
    const maskRevealIcon = compiled.querySelector('ion-icon#passMask');

    expect(logo).toBeTruthy();
    expect(personIcon).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(keyIcon).toBeTruthy();
    expect(passInput).toBeTruthy();
    expect(maskRevealIcon).toBeTruthy();
  });

  it('Comprobar el funcionamiento de la máscara de password',() => {
    const compiled = fixture.debugElement.nativeElement;
    const passInput = compiled.querySelector('ion-input#pass');
    const maskRevealIcon = compiled.querySelector('ion-icon#passMask');

    expect(passInput.type).toBe('password');
    maskRevealIcon.click();
    fixture.detectChanges();
    expect(passInput.type).toBe('text');
    maskRevealIcon.click();
    fixture.detectChanges();
    expect(passInput.type).toBe('password');
  });

  it('La validación no debe de producirse hasta que no sea pulsado el botón de login', ()=>{
    const compiled = fixture.debugElement.nativeElement;

    expect(component.formValidation).toBeFalsy();
    const loginButton = compiled.querySelector('ion-button')
    loginButton.click();
    expect(component.formValidation).toBeTruthy();
  });

  it('El campo email no puede estar vacio y debe tener formato email', () => {
    const emailInput = component.loginForm.controls.email;

    expect(emailInput.valid).toBeFalsy();

    emailInput.setValue('Test text');
    expect(emailInput.valid).toBeFalsy();

    emailInput.setValue('test@test.com');
    expect(emailInput.valid).toBeTruthy();
  });

  it('El campo password no puede estar vacio y debe tener al menos 5 caracteres', () => {
    const passwordInput = component.loginForm.controls.pass;

    expect(passwordInput.valid).toBeFalsy();

    passwordInput.setValue('1234');
    expect(passwordInput.valid).toBeFalsy();

    passwordInput.setValue('12345');
    expect(passwordInput.valid).toBeTruthy();
  });

  it('El Formulario debe de ser validado con los valores correctos', () => {
    const form = component.loginForm;
    expect(form.valid).toBeFalsy();

    const emailInput = component.loginForm.controls.email;
    emailInput.setValue('test@test.test');

    const passwordInput = component.loginForm.controls.pass;
    passwordInput.setValue('12345');

    expect(form.valid).toBeTruthy();
  });
});
