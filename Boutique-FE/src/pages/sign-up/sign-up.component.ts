import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
constructor(private router:Router){}
  onSignup() {
    if (this.username && this.email && this.password) {
      alert('Signup Successful');
    } else {
      alert('Please fill out all fields');
    }
  }
  goTologin(){
    this.router.navigate(['/login'])
  }
}
