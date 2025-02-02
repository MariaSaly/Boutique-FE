import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpServiceWithHeaders } from '../../service/httpServiceForAdmin';

@Component({
  selector: 'app-order-listing',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './order-listing.component.html',
  styleUrl: './order-listing.component.css'
})
export class OrderListingComponent implements OnInit {
  private url = environment.localUrl
  ordersWithDates: any;
 constructor( private http:HttpServiceWithHeaders , private router:Router){
   
 }
  ngOnInit(): void {
   this.getOrderDetails();
  }

  getOrderDetails(){
    this.http.get<any>(`${this.url}/api/orders/getAllOrders`).subscribe(data => {
      console.log("data:", data);
    
      // Map through the orders and convert each Firestore timestamp
      this.ordersWithDates = data.orders.map((item: { Date: any; }) => {
        const firestoreDate = item.Date; // Get the Firestore date
        const jsDate = new Date(firestoreDate._seconds * 1000); // Convert to JavaScript Date
        return {
          ...item, // Keep other fields
          jsDate, // Add the converted JavaScript date
        };
      });
    
      console.log("ordersWithDates:", this.ordersWithDates);
    });
    
    
  }

  viewOrder(id:string){
    this.router.navigate([`/order/${id}`])
  }
  confirmDelete(id:string){
    const confirmDelete = window.confirm(`Are you sure you want to delete order:${id}`);
    if(confirmDelete){
      this.deleteOrder(id)
    }
    else{
      alert("order deleted request is rewind !");
    }
  }
   deleteOrder(id:string){
    this.http.delete<any>(`${this.url}/api/orders/deleteOrder/${id}`).subscribe(()=>{
         alert(`order-${id} deleted sucessfully`);
         this.getOrderDetails();
    })
   }
}
