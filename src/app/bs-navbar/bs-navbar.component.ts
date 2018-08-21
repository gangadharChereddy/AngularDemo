import { Router } from '@angular/router';
import { User } from './../models/user';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser : User;  
  constructor(private auth: AuthService,private router:Router) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
