import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [],
  standalone:true,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  constructor(private router :Router){}
  onsubmit(){
    this.router.navigate(['user'])
  }
}
