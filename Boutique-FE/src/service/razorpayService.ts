import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class razorPayService{
    private url = environment.localUrl;
    constructor( private http:HttpClient){

    }

    createOrder(amount:number){
      return this.http.post(`${this.url}/api/payment/create-order` ,{ amount ,currency:"INR"});
    }
    verifyOrder(data:any){
     return this.http.post(`${this.url}/api/payment/verify-payment`,data);
    }
}