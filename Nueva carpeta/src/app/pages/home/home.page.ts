import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RegisterappApiService } from 'src/app/services/registerapp-api.service';
import jsQR from 'jsqr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  userData: any;
  userData$: Observable<any>;
  scanActive = false;
  scanResult = null;

  attendanceRegistered = false;
  errorMsg: string;

  loading: HTMLIonLoadingElement;

  courseName: string;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    private regApiService: RegisterappApiService,
    private router: Router
  ) {
    this.checkUser();
  }

  // Si el alumno no está conectado, lo redirige a la página de inicio de sesión
  checkUser() {
    if (!this.regApiService.getToken()) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
    this.userData$ = this.regApiService.getUserData();
    this.userData$.subscribe((user) => (this.userData = user));
  }

  // Metodo para mostrar la camara y empezar escaneo
  async startScan() {
    this.reset();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });

    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();

    this.loading = await this.loadingController.create({});
    await this.loading.present();

    requestAnimationFrame(this.scan.bind(this));
  }

  // Metodo para escanear codigo qr
  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.width = this.videoElement.width;
      this.canvasElement.height = this.videoElement.height;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.stopScan();
        this.scanResult = code.data;
        this.registerAttendance();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan() {
    this.scanActive = false;
  }

  reset() {
    this.stopScan();
    this.errorMsg = '';
    this.scanResult = null;
    this.attendanceRegistered = false;
  }

  // Registrar asistencia de alumno
  async registerAttendance() {
    try {
      // Comprueba si el alumno ya está presente
      const userRegistered = await this.regApiService.isUserPresent(
        parseInt(this.scanResult, 10),
        this.userData.pk
      );

      // Obtiene la asignatura de la clase a registrar asistencia
      const course = await this.regApiService
        .getClass(this.scanResult)
        .toPromise();
      this.courseName = `${course.asignatura}-${course.seccion}`;

      // Si el usuario no está presente, se registra la asistencia, al contrario se envía un mensaje de error
      if (!userRegistered) {
        await this.regApiService
          .registerAttendance(parseInt(this.scanResult, 10), this.userData.pk)
          .toPromise();
        this.attendanceRegistered = true;
      } else {
        this.errorMsg = 'Ya estas presente en la clase de ' + this.courseName;
      }
    } catch (err) {
      this.stopScan();
      this.errorMsg = 'Ha ocurrido un error al registrar tu asistencia.';
      console.error(err);
    }
  }
}
