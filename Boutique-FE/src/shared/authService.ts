import { inject, Inject, Injectable } from '@angular/core';
import { Auth ,createUserWithEmailAndPassword ,signInWithCredential,signInWithEmailAndPassword,UserCredential} from '@angular/fire/auth';
import { Router } from '@angular/router';
//import { createUserWithEmailAndPassword } from 'firease/auth';
import { from, Observable } from 'rxjs';

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
       localStorage.setItem('token',token);
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
