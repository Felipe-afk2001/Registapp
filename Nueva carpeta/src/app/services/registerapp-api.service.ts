import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterappApiService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return (
      sessionStorage.getItem('accessToken') ||
      localStorage.getItem('accessToken')
    );
  }

  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.post(
      'https://registrapp-api.herokuapp.com/rest-auth/login/',
      {
        username,
        password,
      }
    );
  }

  getUserData(): Observable<any> {
    return this.http.get(
      'https://registrapp-api.herokuapp.com/rest-auth/user/',
      {
        headers: {
          authorization: 'Token ' + this.getToken(),
        },
      }
    );
  }

  registerAttendance(classId: number, userId: number): Observable<any> {
    console.log(userId);
    return this.http.post(
      'https://registrapp-api.herokuapp.com/attendance/',
      {
        alumno: userId,
        clase: classId,
        fecha: new Date(),
      },
      {
        headers: {
          authorization: 'Token ' + this.getToken(),
        },
      }
    );
  }

  getAttendanceList(classId: number): Observable<any> {
    return this.http.get(
      `https://registrapp-api.herokuapp.com/attendance/${classId}/lista`,
      {
        headers: {
          authorization: 'Token ' + this.getToken(),
        },
      }
    );
  }

  async isUserPresent(classId: number, userId: number): Promise<boolean> {
    let res = false;
    try {
      const data = await this.http
        .get(
          `https://registrapp-api.herokuapp.com/attendance/${userId}/class/${classId}`,
          {
            headers: {
              authorization: 'Token ' + this.getToken(),
            },
          }
        )
        .toPromise();

      if (Object.entries(data).length !== 0) {
        res = true;
      }
    } catch (err) {
      console.error(err);
    }

    return res;
  }

  getClass(classId: number): Observable<any> {
    return this.http.get(
      'https://registrapp-api.herokuapp.com/class/' + classId,
      {
        headers: {
          authorization: 'Token ' + this.getToken(),
        },
      }
    );
  }

  logoutUser(): Observable<any> {
    return this.http.post(
      'https://registrapp-api.herokuapp.com/rest-auth/logout/',
      {},
      {
        headers: { authorization: 'Token ' + this.getToken() },
      }
    );
  }

  resetPassword(data): Observable<any> {
    return this.http.post(
      'https://registrapp-api.herokuapp.com/rest-auth/password/reset/',
      data
    );
  }
}
