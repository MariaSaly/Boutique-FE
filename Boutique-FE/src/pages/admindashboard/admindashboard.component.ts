import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone:true,
  imports: [],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  constructor( private router:Router){}
  goToItem(){
  this.router.navigate(['/item'])
  }
  goToUser(){
    this.router.navigate(['/user'])
    }

}
