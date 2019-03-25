import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { AboutComponent } from './public/about/about.component';
import { SigninComponent } from './public/signin/signin.component';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    AboutComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
