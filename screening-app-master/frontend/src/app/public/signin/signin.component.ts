import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  control: any;
  constructor(private formBuilder: FormBuilder,
    private signinService: SigninService, private tokenService: TokenService, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
    this.control = this.loginForm.controls;
  }

  ngOnInit() {
  }

  onSubmit() {
    const user = {
      username: this.control.username.value,
      password: this.control.password.value
    };

    this.signinService.signin(JSON.stringify(user)).subscribe((response: any) => {
      // console.log(response);
      if (response.token) {
        // console.log(response);
        this.tokenService.saveToken(response.token);
        if (response.admin) {
          // console.log(this.router);
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/staff');
        }
      }
    });
  }

}
