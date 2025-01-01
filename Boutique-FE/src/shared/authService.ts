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
    const promise = signInWithEmailAndPassword(this.firebaseAuth,email,password).then(() => {});
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
    const promise = createUserWithEmailAndPassword(this.firebaseAuth,email,password).then(()=>{})
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
}
