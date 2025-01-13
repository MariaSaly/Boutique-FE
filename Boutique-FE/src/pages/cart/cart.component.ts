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
  userId: any;

constructor( private cartService:CartService, private router:Router){
  
}
ngOnInit(): void {
  this.loadCart();
 

  // this.cartService.currentItems.subscribe( (data:any) => {
  //   console.log("data:", data);
  //   this.cartItems = data;
  // })

  this.calculateCartItems();
}
deleteItem(id:any){
  const previousItem= this.cartItems.find((item:any)=> item.cartId == id);
 
   this.cartService.deleteCart(this.userId,id).subscribe( data => {
    if(data){
      console.log("deleted sucessfully:");
      this.loadCart();
      this.cartService.loadCart(this.userId);
    }
   })
  
  this.calculateCartItems();
}
loadCart(){
  const data = localStorage.getItem('userData');
  console.log("data:",data);
  if(data){
    const userData = JSON.parse(data);
    this.userId   = userData.user_id;
    console.log("userId:",this.userId);

  }

    
  this.cartService.getCart(this.userId).subscribe( data => {
     console.log ("data:", data);
     this.cartItems = data;
  })
}
decreaseQty(item:any){
  //const previousCartItem= this.cartItems.find((item:any)=> item.cartId== id);
  let qty = item.quantity;
  if(qty === 1){
    return
  }
  qty = qty -1;
 
     this.cartService.updateCart(this.userId,item.productId,qty).subscribe(()=>{
      this.loadCart();
     })

     
 
//  this.cartService.updateCart(this.cartItems);
 this.calculateCartItems();

}
increaseQty(item:any){

  
  let qty = item.quantity;
  console.log("qty:",qty);
  if(qty === item.stock){
    return
  }
  qty = qty + 1;
 
    this.cartService.updateCart(this.userId,item.productId,qty).subscribe(()=> {
      this.loadCart();
    })
 
//  this.cartService.updateCart(this.cartItems);
 this.calculateCartItems();

}
calculateCartItems(){
  this.cartCount = this.cartItems.length;
  this.totalQuantity = this.cartItems.reduce((acc:any,current:any)=>{
    return acc+current.quantity;
   },0)
   this.totalPrice = this.cartItems.reduce((acc:any,current:any)=>{
   return acc + (current.price * current.quantity)
   },0)
}
goToShop(){
  this.router.navigate(['/home']);
}

}
