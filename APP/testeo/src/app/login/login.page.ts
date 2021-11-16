import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string;
  contrasena: string;
  constructor(public alertController:AlertController,private router:Router,public loadingcontroller:LoadingController) {
    this.correo='';
    this.contrasena='';

   }

  ngOnInit() {
  }
  async cargando(){
    const cargando= await this.loadingcontroller.create({
      message:'cargando',
      duration:2000, spinner: 'crescent'
    }) 
    await cargando.present()
  }
  async enviar(){
    const usuario=this.correo.substr(0,this.correo.indexOf('@'))
    localStorage.setItem('username',usuario || this.correo)
    await this.cargando();
    setTimeout(()=>{
    this.router.navigate(['/bienve']);
    },2000)
  }
  async validar(){
    if (this.correo == '' || this.contrasena =='' ){
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



