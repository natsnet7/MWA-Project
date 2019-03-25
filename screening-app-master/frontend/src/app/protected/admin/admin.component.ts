import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  signout() {
    this.tokenService.removeToken();
    this.router.navigate(['/about']);
  }

}
