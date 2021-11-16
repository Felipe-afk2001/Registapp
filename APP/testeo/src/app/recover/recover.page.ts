import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  correo: string;
  constructor(public alertController:AlertController,private router:Router,public loadingcontroller:LoadingController) {
    this.correo=''
   }

  ngOnInit() {
  }
  async alerta(){
    const alert= await this.alertController.create({
      message:'Nota: se le enviara un mensaje al correo ingresado para la confirmacion',
      buttons:[{
        text:'aceptar',
        handler:()=>{
            this.router.navigate(['/inicio'])
        }
      }]
    }) 
    await alert.present()
  }
  async cargando(){
    const cargando= await this.loadingcontroller.create({
      message:'cargando',
      duration:2000, spinner: 'crescent'
    }) 
    await cargando.present()
  }
  async enviar(){
    await this.cargando();
    setTimeout(()=>{
    this.alerta();
    },2000)
  }
  async validar(){
    if (this.correo == ''){
      const alert= await this.alertController.create({
        message:'Error: campos vacios',
        buttons:['aceptar']
      }) 
      await alert.present()
    }else{
      this.enviar()
    }
  }
}
