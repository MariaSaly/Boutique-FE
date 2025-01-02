import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/authService';
import {Validators, FormGroup,FormControl, ReactiveFormsModule,} from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginform: FormGroup ;
  constructor(private router: Router , private authService:AuthService) {
    this.loginform = new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('', [Validators.required,Validators.minLength(5)])
    })
  }
  onLogin(): void {
    if (this.loginform.valid) {
      // Access email and password separately
      const email = this.loginform.get('email')?.value;
      const password = this.loginform.get('password')?.value;

      // Call the login service with separate email and password
      this.authService.login(email, password).subscribe({
        next:(response)=>{
          alert("Logged in Sucessfully !");
          this.router.navigate(['/MoksheDestination']);
        },
        error:(error)=>{
          alert(` Error in logging in ${error}`);
        }
      });
    } else {
      console.log("Form is not valid");
    }
  }
  goToSignUp(){
    this.router.navigate(['/signup']);
  }
}

  


