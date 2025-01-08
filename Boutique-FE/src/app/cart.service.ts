import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  itemSource = new BehaviorSubject([]);
  currentItems = this.itemSource.asObservable();
  cartItems:any = [];
  


  addItem(newCartItem:any){
    
    const previousCartItem = this.cartItems.find( (el:any)=> el.product.id === newCartItem.product.id);
    if(previousCartItem){
       this.cartItems = this.cartItems.map((item:any)=>{
        if(item.product.id === previousCartItem.product.id){
          item.qty = item.qty + 1;
        }
        return item;
      })
    }
    else{
      this.cartItems.push(newCartItem);
    }
  
    this.itemSource.next(this.cartItems);
  }

  updateCart( items:any[]){
    this.cartItems = items;
    this.itemSource.next(this.cartItems);
  }
  // Toggle cart visibility
  
}
