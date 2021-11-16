import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR from 'jsqr';

@Component({
  selector: 'app-bienve',
  templateUrl: './bienve.page.html',
  styleUrls: ['./bienve.page.scss'],
})
export class BienvePage implements OnInit {
  usuario:string;
  correo: string;
  contrasena: string;
  constructor (public alertController:AlertController,private router:Router,public loadingcontroller:LoadingController) {
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
    const canvas=document.createElement("canvas")
    const image=await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Camera
    })
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image.dataUrl;
    img.onload = () => {
      img.width = canvas.width;
      img.height = canvas.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imgData.data, canvas.width, canvas.height);
      if (code) {
        window.location.replace(code.data);
      } else {
        this.ini_camara();
      }
    };
  }

}
