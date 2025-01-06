import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  imports: [],
  standalone:true,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  constructor(private router:Router){}
  addUser(){
    this.router.navigate(['adduser'])
  }
}
