import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';
@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    isAuthenticated: boolean;
    token = '';
    constructor(private service: TokenService) {
        this.token = this.service.getToken();
        this.isAuthenticated = this.token != null;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isAuthenticated && this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }
        return next.handle(request);
    }
}
