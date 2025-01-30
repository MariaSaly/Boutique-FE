import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app/app.module';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
 imports:[CommonModule,FormsModule],
  standalone:true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  public url = environment.localUrl
  orders: any[]=[];
constructor(private http:HttpService){

}
  ngOnInit(): void {
    this.getOrder()

    
  }
  getProductImage(productId: string): string {
   this.http.get<any>(`${this.url}/app/items/getItemById/${productId}`).subscribe( data => {
    console.log("data:",data);
   })
    return  'default-image.jpg'; // Default image if not found
  }
  convertToDate(date:any): Date {
    const seconds = date._seconds;
    const nanoseconds = date._nanoseconds;
    // Create a new Date object with the seconds part of the timestamp
    return new Date(seconds * 1000); // Convert seconds to milliseconds
  }

  getOrder(){
    const data:any = localStorage.getItem('userData');
    if(data){
     const user = JSON.parse(data);
     const userId = user.user_id;
     this.http.get<any>(`${this.url}/api/orders/orderByUserId/${userId}`).subscribe( data =>{
      console.log("data:", data );
      this.orders = data.orders;
     })

    }
    else{
      console.log("no user is logged in ")
    }
  }
}
