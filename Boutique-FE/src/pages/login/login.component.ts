import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopupMessageComponent } from '../popupmessage/popup-message/popup-message.component';
import { SharedModule } from '../../app/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginform: FormGroup;
  showPopup = false; // Control popup visibility
  popupTitle = ''; // Title for the popup
  popupMessage = ''; // Message for the popup

  constructor(private router: Router, private authService: AuthService) {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
 
  
  onLogin(): void {
    if (this.loginform.valid) {
      const email = this.loginform.get('email')?.value;
      const password = this.loginform.get('password')?.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log("response:",response);
          console.log('Login Successful');
          this.showPopupMessage('Success', 'Logged in Successfully!');
          if(response.role === "admin"){
            this.router.navigate(['/item']);
          }
          else{
            this.router.navigate(['/MoksheDestination']);
          }
          
        
        },
        error: (error) => {
          console.log('Login Error:', error);
          this.showPopupMessage('Error', `Error in logging in: ${error}`);
        },
      });
      
    } else {
      console.log('Form is not valid');
    }
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  showPopupMessage(title: string, message: string) {
    this.popupTitle = title;
    this.popupMessage = message;
    this.showPopup = true;  // Set flag to true
    console.log('Popup visible:', this.showPopup);  // Debugging line
  }
  

  closePopup() {
    this.showPopup = false; // Hide the popup
  }
}
