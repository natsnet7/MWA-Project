import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  BASE_API_URL: String = 'http://localhost:4000';
}
