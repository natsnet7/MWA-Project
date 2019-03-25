import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private configService: ConfigService) {

  }
  getQuestions() {
    return this.http.get(this.configService.BASE_API_URL + '/questions');
  }

  addQuestion(reqBody) {
    return this.http.post(this.configService.BASE_API_URL + '/questions', reqBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateQuestion(reqBody) {
    return this.http.patch(this.configService.BASE_API_URL + '/questions', reqBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
