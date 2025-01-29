import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app/app.module';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';

@Component({
  selector: 'app-profile',
 
  standalone:true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  public url = environment.localUrl
constructor(private http:HttpService){

}
  ngOnInit(): void {
    this.getOrder()

    
  }
  getOrder(){
    const data:any = localStorage.getItem('userData');
    if(data){
     const user = JSON.parse(data);
     const userId = user.user_id;
     this.http.get<any>(`${this.url}/api/orders/orderByUserId/${userId}`).subscribe( data =>{
      console.log("data:", data );
     })

    }
    else{
      console.log("no user is logged in ")
    }
  }
}
