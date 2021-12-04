import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController ,ToastController} from '@ionic/angular';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  correo: string;

  constructor(public alertController: AlertController,public toastController: ToastController,
    private router: Router,public loadingcontroller: LoadingController) {
    this.correo='';
  }

  ngOnInit() {}

  async alerta(){
    const alert= await this.toastController.create({
      message:'Nota: se le enviara un mensaje al correo ingresado para la confirmacion',
      duration: 3000,
    });
    await alert.present();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3100);
  }
  async cargando(){
    const cargando= await this.loadingcontroller.create({
      message:'cargando',
      duration:2000, spinner: 'crescent'
    });
    await cargando.present();
  }
  async enviar(){
    await this.cargando();
    setTimeout(()=>{
    this.alerta();
    },2000);
  }
  async validar(){
    if (this.correo === ''){
      const alert= await this.toastController.create({
        message:'Error: El campo correo esta vacio',
        duration: 3000,
        color: 'danger',
      });
      await alert.present();
    }else{
      this.enviar();
    }
  }
}
