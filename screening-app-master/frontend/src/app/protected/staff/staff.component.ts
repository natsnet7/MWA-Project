import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  signout() {
    this.tokenService.removeToken();
    this.router.navigate(['/about']);
  }

}
