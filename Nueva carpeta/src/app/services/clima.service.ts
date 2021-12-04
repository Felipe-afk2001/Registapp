import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  constructor(private http: HttpClient) {}

  getWeather(lat, lon): Promise<any> {
    console.log(lat, lon);
    const apiKey = '7e44c52c5de38936a192d3057804cd39';
    return this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .toPromise();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (error) => reject(error)
        );
      }
    });
  }
}
