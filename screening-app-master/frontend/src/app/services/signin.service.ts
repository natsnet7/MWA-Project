import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

    signin(userCredentials) {
      // console.log(userCredentials);
        return this.http.post(`${this.configService.BASE_API_URL}/users/auth`, userCredentials, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
}
