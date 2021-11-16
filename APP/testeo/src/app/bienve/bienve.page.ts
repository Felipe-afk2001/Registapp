import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-bienve',
  templateUrl: './bienve.page.html',
  styleUrls: ['./bienve.page.scss'],
})
export class BienvePage implements OnInit {
  usuario:string;
  correo: string;
  imagedata: String;
  contrasena: string;
  constructor(public alertController:AlertController,private router:Router,public loadingcontroller:LoadingController) {
    this.correo=''
   }
  ngOnInit() {
  }
  // async alerta(){
  //   const alert= await this.alertController.create({
  //     message:'Asistencia registrada correctamente',
  //     buttons:[{
  //       text:'aceptar',
  //       handler:()=>{
  //           this.router.navigate(['/inicio'])
  //       }
  //     }]
  //   }) 
  //   await alert.present()
  // }
  // async cargando(){
  //   const cargando= await this.loadingcontroller.create({
  //     message:'cargando',
  //     duration:2000, spinner: 'dots'
  //   }) 
  //   await cargando.present()
  // }
  // async enviar(){
  //   await this.cargando();
  //   setTimeout(()=>{
  //   this.alerta();
  //   },2000)
  // }

 async ini_camara(){
    const image=await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.Uri
    })
    this.imagedata=image.dataUrl;
  }

}
