import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./httpService";

@Injectable({
    providedIn:'root'
})

export class razorPayService{
    private url = environment.localUrl;
    constructor( private http:HttpService){


    }

    createOrder(orderData:any){
      return this.http.post(`${this.url}/api/orders/createOrders` ,orderData);
    }
    verifyOrder(data:any){
     return this.http.post(`${this.url}/api/payment/verify-payment`,data);
    }
}