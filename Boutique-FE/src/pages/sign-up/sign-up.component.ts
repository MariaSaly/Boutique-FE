import { Component } from '@angular/core';
import {Validators, FormGroup,FormControl, ReactiveFormsModule,} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,ToastrModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  signup: FormGroup ;
  name:string ='';
constructor(private router:Router, private authService:AuthService, private toastr: ToastrService){
  this.signup = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('', [Validators.required,Validators.minLength(5)]),
    phonenumber:new FormControl('', [Validators.required,Validators.minLength(10)]),
    name:new FormControl('')
  })
}
onSignUp(): void {
  if (this.signup.valid) {
    const email = this.signup.get('email')?.value;
    const password = this.signup.get('password')?.value;
    const phonenumber = this.signup.get('phonenumber')?.value;
    const name = this.signup.get('name')?.value;

    this.authService.signup(name, email, password, phonenumber).subscribe({
      next: (response) => {
        console.log("SignUp Successful");  // Debugging line
        this.toastr.success('Sign Up Successfully!', 'Success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Signup Failed:", error);  // Debugging line
        this.toastr.error('Invalid email or password', 'Sign Up Failed');
      }
    });
  } else {
    console.log("Form is invalid");  // Debugging line
    this.toastr.error('Form is invalid', 'Error');
  }
}

  goTologin(){
    this.router.navigate(['/login'])
  }
}
