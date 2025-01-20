import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit {
  isSuperAdmin: boolean = false;
  constructor( private router:Router){}
  ngOnInit(): void {
   this.getUserData()
  }
  goToItem(){
  this.router.navigate(['/item'])
  }
  goToUser(){
    this.router.navigate(['/user'])
    }
    goToOrder(){
      this.router.navigate(['/order-listing'])
    }

    getUserData(){
      const data = localStorage.getItem('userData');
      if(data){
        const user = JSON.parse(data); 
        const userRole = user.role;
        console.log("userrole:",userRole);
        if(userRole === 'superAdmin'){
          this.isSuperAdmin = true;
        }
      }
    }

}
