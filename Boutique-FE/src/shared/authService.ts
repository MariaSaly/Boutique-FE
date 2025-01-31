import { inject, Inject, Injectable } from '@angular/core';
import { Auth ,createUserWithEmailAndPassword ,signInWithCredential,signInWithEmailAndPassword,UserCredential} from '@angular/fire/auth';
import { Router } from '@angular/router';
//import { createUserWithEmailAndPassword } from 'firease/auth';
import { from, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { userService } from '../service/userService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor( private router: Router , private userService:userService ) {}
  firebaseAuth = inject(Auth)
   

   // Method to check and refresh token if expired
   private async getValidToken(): Promise<string> {
    const user = this.firebaseAuth.currentUser;
  
    if (!user) {
      this.router.navigate(['/login']); // Redirect to login if user is not authenticated
      throw new Error('User is not authenticated');
    }
  
    try {
      const token = await user.getIdToken(true);
      return token;
    } catch (err) {
      console.error('Error refreshing token:', err);
      throw new Error('Failed to refresh token');
    }
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
    return this.isLoggedIn() && userRole === 'admin' || userRole === 'superAdmin';
  }

  // login method
  login(email: string, password: string): Observable<{ role: string }> {
    const promise = (async () => {
      try {
        // Sign in user
        const UserCredential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
        const token = await UserCredential.user.getIdToken(true);
        console.log("Token:", token);
  
        // Decode token
        const decodedToken = jwtDecode<any>(token);
        console.log("Decoded Token:", decodedToken);
  
        // Remove old data first
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
  
        // Store new token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(decodedToken));
  
        // Return role
        return { role: decodedToken.role };
      } catch (error) {
        console.error("Error in login:", error);
        throw error; // Propagate error to the caller
      }
    })();
  
    return from(promise);
  }
  

  // register method
   signup(name:string,email: string, password: string,phonenumber:number):Observable<void> {
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
       const userDocument = {
        name:name,
        email:email,
        password:password,
        phonenumber:phonenumber,

      }
      try{
           this.userService.createUser(userDocument).subscribe( 
            (data)=>{
              console.log("user created sucessfuly");
            },
            (error)=>{
              console.log(`Error in creating user :${error}`);
            }
           )
           console.log(`sucessfully stored the user data!`)
      }
      catch(err){
        console.error(`Error in storing the user data in firestore : ${err}`)
      }
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
    localStorage.removeItem('userData')
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
