import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpServiceWithHeaders } from '../../service/httpServiceForAdmin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-listing',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './order-listing.component.html',
  styleUrl: './order-listing.component.css'
})
export class OrderListingComponent implements OnInit {
  private url = environment.localUrl
  ordersWithDates: any;
  filteredOrders: any[] = []; 
  selectedStatus: string = "";    // Orders after filtering
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
      this.filteredOrders = [...this.ordersWithDates]
    
      console.log("ordersWithDates:", this.ordersWithDates);
    });
    
    
  }
   filterOrders() {
    if (this.selectedStatus) {
      this.filteredOrders = this.ordersWithDates.filter((order:any) => order.status === this.selectedStatus);
    } else {
      this.filteredOrders = [...this.ordersWithDates]; // Show all if no filter selected
    }
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
