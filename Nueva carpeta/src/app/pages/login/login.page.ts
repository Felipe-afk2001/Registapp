import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ClimaService } from 'src/app/services/clima.service';
import { RegisterappApiService } from 'src/app/services/registerapp-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  keepConnected: FormControl;
  message: string;
  credentialsValid: boolean;
  weather;
  weatherIcon: string;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router,
    private regApiService: RegisterappApiService,
    private climaService: ClimaService
  ) {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.keepConnected = new FormControl(false);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
      keepConnected: this.keepConnected,
    });

    this.checkUser();
    this.getClima();
  }

  ngOnInit() {}

  async getClima() {
    const pos = await this.climaService.getPosition();

    this.weather = await this.climaService.getWeather(
      pos.coords.latitude,
      pos.coords.longitude
    );
    this.weatherIcon = `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
  }

  // Si el alumno tiene la sesión iniciada lo redirige a '/home'
  checkUser() {
    if (this.regApiService.getToken()) {
      this.router.navigate(['/home']);
    }
  }

  // Creación de mensaje de error/exito (toast)
  async showMessage(): Promise<void> {
    const toast = await this.toastController.create({
      message: this.message,
      color:
        this.loginForm.valid && this.credentialsValid ? 'success' : 'danger',
      mode: 'ios',
      duration: 3000,
    });

    await toast.present();
  }

  // Animación de cargando...
  async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: 'Conectando...',
    });

    return loading;
  }

  // Validación de formulario
  checkForm(): boolean {
    if (!this.username.valid) {
      this.message = 'Por favor ingrese su nombre de usuario.';
    } else if (!this.password.valid) {
      this.message = 'Por favor ingrese su contraseña.';
    }

    return this.loginForm.valid;
  }

  // Validación de inicio de sesión
  async validateLogin(): Promise<boolean> {
    let res = false;
    try {
      const data = await this.regApiService
        .authenticateUser(this.username.value, this.password.value)
        .toPromise();

      if (this.keepConnected.value) {
        localStorage.setItem('accessToken', data.key);
      } else {
        sessionStorage.setItem('accessToken', data.key);
      }

      res = true;
    } catch (err) {
      if (err.error.non_field_errors) {
        this.message = err.error.non_field_errors[0];
      } else {
        this.message =
          'Ha ocurrido un error desconocido. Por favor vuelva a intentarlo más tarde.';
      }
    }

    return res;
  }

  // Envío de formulario
  async submitLogin(): Promise<any> {
    const loading = await this.showLoading();
    await loading.present();

    if (this.checkForm()) {
      this.credentialsValid = await this.validateLogin();
      await loading.dismiss();

      if (this.credentialsValid) {
        return this.router.navigate(['/home']);
      }
    } else {
      await loading.dismiss();
    }

    await this.showMessage();
  }
}
