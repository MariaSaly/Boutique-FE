import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { HttpService } from '../../../service/httpService';
import { environment } from '../../../environment';
import { HttpServiceWithHeaders } from '../../../service/httpServiceForAdmin';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  email: string = '';
  password: string = '';
  role:string ='';
  addUser: FormGroup ;
  loading:boolean = false;
  private url = environment.localUrl;
  constructor(private router :Router, private http:HttpServiceWithHeaders){
    this.addUser = new FormGroup({
        email: new FormControl('',[Validators.email,Validators.required]),
        password:new FormControl('', [Validators.required,Validators.minLength(5)]),
        role:new FormControl('', [Validators.required])
      })
  }
  firebaseAuth = inject(Auth)

  signup():Observable<void> {
      // try {
      //   await this.fireAuth.createUserWithEmailAndPassword(email, password);
      //   alert('Registered user successfully');
      //   this.router.navigate(['/login']);
      // } catch (err) {
      //   alert(`Error in signup${err}`);
      //   this.router.navigate(['/signup']);
      // }
      if (this.loading) return of(); // Prevent further execution if already submitting

      this.loading = true;
      const email = this.addUser.get('email')?.value;
    const password = this.addUser.get('password')?.value;
    const role = this.addUser.get('role')?.value;
      const promise = createUserWithEmailAndPassword(this.firebaseAuth,email,password).then( async (UserCredential)=>{
        
        const uuid = UserCredential.user.uid;
        this.http.post<any>(`${this.url}/api/add-role`,{uid:uuid,role:role}).subscribe( response => {
          console.log(" added role and created user sucessfully")
        })
        const token = await UserCredential.user.getIdToken();
        console.log("token:",token);
         localStorage.setItem('token',JSON.stringify(token));
      })
      return from(promise)
    }
  onsubmit(){
    this.signup();
    this.router.navigate(['user'])
  }
}
