import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient, private configService: ConfigService) {

  }
  getStaff() {
    return this.http.get(this.configService.BASE_API_URL + '/users?admin=false');
  }

  addStaff(reqBody) {
    return this.http.post(this.configService.BASE_API_URL + '/users?admin=false', reqBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateStaff(reqBody) {
    console.log(reqBody);
    return this.http.patch(this.configService.BASE_API_URL + '/users?admin=false', reqBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
