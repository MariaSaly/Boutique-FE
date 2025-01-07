import { inject, Inject, Injectable } from '@angular/core';
import { Auth ,createUserWithEmailAndPassword ,signInWithCredential,signInWithEmailAndPassword,UserCredential} from '@angular/fire/auth';
import { Router } from '@angular/router';
//import { createUserWithEmailAndPassword } from 'firease/auth';
import { from, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor( private router: Router) {}
  firebaseAuth = inject(Auth)

   // Method to check and refresh token if expired
   private async getValidToken(): Promise<string> {
    const user = this.firebaseAuth.currentUser;

    if (!user) {
      throw new Error('User is not authenticated');
    }

    // Get the ID token and automatically refresh it if expired
    const token = await user.getIdToken(true); // Passing 'true' forces a refresh
    
    return token;
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
  
    // Check if the token is not null
    if (!token) {
      return false; // or handle the case where there is no token
    }
  
    // Parse the token and decode
    const decodedToken = jwtDecode<any>(token);
  
    // Assuming userRole is extracted from decodedToken
    const userRole = decodedToken?.role; // Adjust this depending on your token structure
    return this.isLoggedIn() && userRole === 'admin';
  }

  // login method
   login(email: string, password: string):Observable<void> {
    // try {
    //   await this.firebaseAuth.si(email, password);
    //   localStorage.setItem('token', 'true');
    //   this.router.navigate(['dashboard']);
    // } catch (err) {
    //     alert(`Error in signup${err}`);
    //   this.router.navigate(['/login']);
    // }
    const promise = signInWithEmailAndPassword(this.firebaseAuth,email,password).then( async(UserCredential) => {
    const token = await UserCredential.user.getIdToken(true);
    console.log("token:",token);
    const decodedToken = jwtDecode<any>(token);
    
    console.log("decodedToken:",decodedToken);
    localStorage.setItem('token',token);


    });
    return from(promise);
  }

  // register method
   signup(email: string, password: string):Observable<void> {
    // try {
    //   await this.fireAuth.createUserWithEmailAndPassword(email, password);
    //   alert('Registered user successfully');
    //   this.router.navigate(['/login']);
    // } catch (err) {
    //   alert(`Error in signup${err}`);
    //   this.router.navigate(['/signup']);
    // }
    console.log("email:",email);
    console.log("password:",password);
    const promise = createUserWithEmailAndPassword(this.firebaseAuth,email,password).then( async (UserCredential)=>{
      const token = await UserCredential.user.getIdToken();
      console.log("token:",token);
       localStorage.setItem('token',JSON.stringify(token));
    })
    return from(promise)
  }

  // logout method
  // async logout() {
  //   try {
  //     await this.fireAuth.signOut();
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   } catch (err) {
  //       alert(`Error in signup${err}`);
  //   }
  // }
  logout(){
   const promise = this.firebaseAuth.signOut().then(()=>{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
   });
   return from(promise).subscribe();
  }

  async makeApiCall(): Promise<string | null> {
    try {
      const token = await this.getValidToken();
  
      if (!token) {
        throw new Error('Token is invalid or missing');
      }
  
      // Call your API with the valid token
      console.log('API call with token:', token);
      return token;
    } catch (error) {
      console.error('Error fetching valid token:', error);
      return null;  // Or you can handle the error in a specific way (e.g., return a default value or rethrow)
    }
  }
  
}
