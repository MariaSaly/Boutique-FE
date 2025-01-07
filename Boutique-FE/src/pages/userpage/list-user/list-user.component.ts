import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../service/httpService';
import { environment } from '../../../environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-user',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit {
  users:any;
  private url = environment.localUrl;
  constructor(private router:Router, private http:HttpService){}
  ngOnInit(): void {
   this.getUsers();
  }
 
  getUsers(){
    this.http.get<any>(`${this.url}/api/list-users`).subscribe( data => {
      this.users = data;
      console.log("users:",this.users);
    })
  }
  
  addUser(){
    this.router.navigate(['adduser'])
  }
}
