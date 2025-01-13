import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../service/httpService';
import { environment } from '../environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private url= environment.localUrl;
 private cartCountSubject = new BehaviorSubject<number>(0);
 cartCount$ = this.cartCountSubject.asObservable();
  userId: any;

  constructor(private http:HttpService) { }

  //load the cart ad update the count 

  loadCart(userId:string):void{
    
    this.getCart(userId).subscribe( data => {
      this.cartCountSubject.next(data.length);
    })

  }

  // get the cart item 

  getCart(userId:string):Observable<any>{
     return this.http.get(`${this.url}/api/cart/getCart/${userId}`);
  }

  //create cart 
  addToCart( userId:string,productId:string,quantity:number):Observable<any>{
    return this.http.post(`${this.url}/api/cart/addCart`,{userId,productId,quantity})
  }
  //updateCart
  updateCart(userId:string,productId:string,quantity:number):Observable<any>{
    return this.http.patch(`${this.url}/api/cart/updateCart`,{userId,productId,quantity})
  }
  //deletecart
  deleteCart(userId:string,productId:string){
    return this.http.delete(`${this.url}/api/cart/deleteCart/${userId}/${productId}`)
  }
}