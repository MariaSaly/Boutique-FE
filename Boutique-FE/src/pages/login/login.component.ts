import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router) {}
  onLogin() {
    if (this.username && this.password) {
      alert('Login Successful');
    } else {
      alert('Please fill out all fields');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
