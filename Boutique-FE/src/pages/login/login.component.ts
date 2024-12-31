import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router , private authService:AuthService) {}
  onLogin() {
    if(this.email == '' ){
      alert("Please Enter the Email");
      return;
    }
    if(this.password == '' ){
      alert("Please Enter the Password");
      return;
    }
  this.authService.login( this.email, this.password);
  this.email = '';
  this.password = '';
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
