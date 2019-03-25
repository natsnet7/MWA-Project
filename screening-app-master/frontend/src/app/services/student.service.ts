import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private configService: ConfigService) {

  }
  getStudents() {
    return this.http.get(this.configService.BASE_API_URL + '/students');
  }

  sendInvitation(student) {
    return this.http.patch(
      `${this.configService.BASE_API_URL}/students/${student._id}?invite=true`, student, httpOptions
    );
  }

  // validate token and get an exam (3 random questions)
  getExam(studentId: number) {
    return this.http.get(this.configService.BASE_API_URL + `/questions?studentId=${studentId}`);
  }
  submitExam(studentId, examObj) {
    return this.http.patch(`${this.configService.BASE_API_URL}/students/${studentId}?exam=true`, examObj, httpOptions);
  }
}
