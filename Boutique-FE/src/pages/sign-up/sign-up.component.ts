import { Component } from '@angular/core';
import {Validators, FormGroup,FormControl, ReactiveFormsModule,} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  signup: FormGroup ;
constructor(private router:Router, private authService:AuthService){
  this.signup = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('', [Validators.required,Validators.minLength(5)])
  })
}
onSignUp(): void {
  if (this.signup.valid) {
    // Access email and password separately
    const email = this.signup.get('email')?.value;
    const password = this.signup.get('password')?.value;

    // Call the login service with separate email and password
    this.authService.signup(email, password).subscribe({
      next:(response) =>{
        alert("Signed In sucessfully");
        this.router.navigate(['/login']);
      },
      error:(error)=>{
          alert(`Error in Signup ${error}`);
      }
    });
  } else {
    console.log("Form is not valid");
  }
}
  goTologin(){
    this.router.navigate(['/login'])
  }
}
