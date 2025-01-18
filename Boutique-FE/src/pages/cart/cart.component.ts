import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../app/cart.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { razorPayService } from '../../service/razorpayService';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { user } from '@angular/fire/auth';
declare var Razorpay:any

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
  public url = environment.localUrl;
  

constructor( private cartService:CartService, private router:Router ,private cdr: ChangeDetectorRef, private razorpayService:razorPayService ,private httpClient:HttpClient){
  
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
  let userId:string = '';
  if(this.userId){
    userId = this.userId;
  }
  else{
    const guestData = localStorage.getItem('guestId');
    userId = guestData || ''
  }
 
   this.cartService.deleteCart(userId,id).subscribe( data => {
    if(data){
      console.log("deleted sucessfully:");
      this.loadCart();
      this.cartService.loadCart(userId);
    }
   })
  
  this.calculateCartItems();
}
private loadRazorpayScript():Promise<void>{
  return new Promise((resolve, reject)=> {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload= () => resolve();
    script.onerror = () => reject('Razorpay SDK is failed to load.');
    document.body.appendChild(script);
  })
}
loadCart(){
  let userId:string= '';
  const data = localStorage.getItem('userData');
  const guestData = localStorage.getItem('guestId');
  console.log("data:",data);
 
  if(data){
    const userData = JSON.parse(data);
    this.userId   = userData.user_id;
     userId = this.userId;
    console.log("userId:",this.userId);

  }
  else{
    
    userId = guestData || ''
    
  }
  if ( data && guestData){
    console.log("guestData:", guestData);
     console.log("iam going to implement the get cart guest ");
    this.cartService.getCartGuest(userId,guestData).subscribe( data => {
      console.log ("data:", data);
      this.cartItems = data;
      const guestId = localStorage.getItem('guestId');
      if(guestId){
        localStorage.removeItem('guestId');
        console.log("guestId removed from local storage sucessfully");
      }

  
  

     //  this.cartItems.forEach((item)=>{
     //   this.fetchImageForItems(item);
     //  })
      this.calculateCartItems();
   })
  }else{
    this.cartService.getCart(userId).subscribe( data => {
      console.log ("data:", data);
      this.cartItems = data;
     //  this.cartItems.forEach((item)=>{
     //   this.fetchImageForItems(item);
     //  })
      this.calculateCartItems();
   })
  }

    
  
}
fetchImageForItems(Item: any): void {
    
  let imagePath = Item.imageUrl;

  // Ensure no duplicate slashes in the URL
  const normalizedUrl = `${this.url.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`;
  
  console.log("Fetching image from:", normalizedUrl);
  
  this.httpClient.get(normalizedUrl, { responseType: 'blob' })
    .subscribe(
      (imageBlob: Blob) => { 
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload = () => {
          if (reader.result) {
            Item.imageDataUrl = reader.result as string;
            this.cdr.markForCheck();
          } else {
            console.error('FileReader result is empty');
          }
        };
        reader.onerror = () => {
          console.error('FileReader error occurred');
        };
      },
      error => {
        console.error(`Error fetching image for item ${Item.id}:`, error);
      }
    );
  
}
decreaseQty(item:any){
  //const previousCartItem= this.cartItems.find((item:any)=> item.cartId== id);
  let qty = item.quantity;
  if(qty === 1){
    return
  }
  qty = qty -1;

  let userId:string = '';
  if(this.userId){
    userId = this.userId;
  }
  else{
    const guestData = localStorage.getItem('guestId');
    userId = guestData || ''
  }
 
     this.cartService.updateCart(userId,item.productId,qty).subscribe(()=>{
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
  let userId:string = '';
  if(this.userId){
    userId = this.userId;
  }
  else{
    const guestData = localStorage.getItem('guestId');
    userId = guestData || ''
  }
 
    this.cartService.updateCart(userId,item.productId,qty).subscribe(()=> {
      this.loadCart();
    })
 
//  this.cartService.updateCart(this.cartItems);


}
calculateCartItems(){
  console.log("cartitems:", this.cartItems);
  this.cartCount = this.cartItems.length;
  console.log("cartCount:", this.cartCount);
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
proceedToCheckout(){
  const data = localStorage.getItem('token');
  if(data){
    const amount = this.totalPrice;
   this.razorpayService.createOrder(amount).subscribe( (order:any)=>{
    const options = {
      key:"rzp_test_EoH3hlWAoDxXig",
      amount:order.amount,
      currency:order.currency,
      name:"Mokshe Rental Destination",
      description:"order payment ",
      order_id:order.id,
      handler:(response:any)=> {
        const paymentData = {
          order_id: order.id,
          razorpay_payment_id:response.razorpay_payment_id,
          razorpay_signature:response.razorpay_signature,
          
        };
        console.log("paymentdeatils:", paymentData);
        this.razorpayService.verifyOrder(paymentData).subscribe(
          (verificationResponse) => {
            alert("payment Sucessfull!");
            console.log("verificationResponse:", verificationResponse);
          },
          (error)=>{
            alert("payment verification failed");
            console.log("error:", error);
          }
        );
      },
      prefill:{
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999',
      },
      theme:{
        color: '#3399cc',
      }
    };
    const rzp = new Razorpay(options);
    rzp.open()
   })
  }
  else{
    alert('please login to complete the order');
  }
  
}

}
