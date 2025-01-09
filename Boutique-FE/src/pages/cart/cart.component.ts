import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../app/cart.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,MatIconModule],
  standalone:true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartCount:number = 0;
  totalQuantity:number =0;
  totalPrice:number = 0;
  cartItems:any[] =[];
  isMobileView: boolean = false; 

constructor( private cartService:CartService, private router:Router){
  
}
ngOnInit(): void {
 
 

  this.cartService.currentItems.subscribe( (data:any) => {
    console.log("data:", data);
    this.cartItems = data;
  })
  this.calculateCartItems();
}
deleteItem(id:any){
  const previousItem= this.cartItems.find((item:any)=> item.product.id == id);
  if(previousItem){
    const filteredItems = this.cartItems.filter((item:any)=> item.product.id !== id);
    //this.cartItems = filteredItems;
    this.cartService.updateCart(filteredItems);
  }
  this.calculateCartItems();
}

decreaseQty(id:string){
  const previousCartItem= this.cartItems.find((item:any)=> item.product.id == id);
  let qty = previousCartItem.qty;
  if(qty === 1){
    return
  }
  qty = qty -1;
  if(previousCartItem){
    this.cartItems = this.cartItems.map((item:any)=>{
     if(item.product.id === previousCartItem.product.id){
       item.qty = qty;
     }
     return item;
   })
 }
 this.cartService.updateCart(this.cartItems);
 this.calculateCartItems();

}
increaseQty(id:string){
  const previousCartItem= this.cartItems.find((item:any)=> item.product.id == id);
  console.log("previouscaritem:",previousCartItem.product.stock);
  let qty = previousCartItem.qty;
  console.log("qty:",qty);
  if(qty === previousCartItem.product.stock){
    return
  }
  qty = qty + 1;
  if(previousCartItem){
    this.cartItems = this.cartItems.map((item:any)=>{
     if(item.product.id === previousCartItem.product.id){
       item.qty = qty;
     }
     return item;
   })
 }
 this.cartService.updateCart(this.cartItems);
 this.calculateCartItems();

}
calculateCartItems(){
  this.cartCount = this.cartItems.length;
  this.totalQuantity = this.cartItems.reduce((acc:any,current:any)=>{
    return acc+current.qty;
   },0)
   this.totalPrice = this.cartItems.reduce((acc:any,current:any)=>{
   return acc + (current.product.price * current.qty)
   },0)
}
goToShop(){
  this.router.navigate(['/home']);
}

}
