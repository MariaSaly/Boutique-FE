import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../app/cart.service';
import { HttpService } from '../../../service/httpService';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-viewsaree',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  standalone:true,
  templateUrl: './viewsaree.component.html',
  styleUrl: './viewsaree.component.css'
})
export class ViewsareeComponent implements OnInit {
  userId: any;
  itemId: string | null = '';
  public url = environment.localUrl;
  itemData: any;
  constructor( private cartService:CartService , private http:HttpService  ,private cdr: ChangeDetectorRef, private route:ActivatedRoute , private httpClient:HttpClient , ){

  }
  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    console.log("id:", this.itemId);
    if(this.itemId){
      this.getItemByID();
    }
  }
  getItemByID(){
    this.http.get(`${this.url}/api/items/getItemById/${this.itemId}`).subscribe( data => {
      console.log("data:", data);
      this.itemData = data;
    
    
       
    })
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
  selectedProduct = {
    title: 'Aamina Saree',
    description: 'A beautiful saree for special occasions.',
    price: 99.99,
    stock:5
  };

  selectedImage = 'assets/mo11.png';  // default large image
  smallImages = [
    'assets/mo11.png',
    'assets/images/bg2.png',
    'assets/images/bg3.png',
    // Add more image paths here
  ];

  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize: string = 'M';

  customText: string = '';
  quantity: number = 1;

  selectImage(image: string) {
    this.selectedImage = image;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQuantity(): void {
    if(this.quantity === this.selectedProduct.stock){
      return
    }
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    console.log("Im in add to cart function");
    // const newCartItem = {
    //   product: this.selectedProduct,
    //   qty:this.quantity
    // }
    const productId = this.itemData.id;
    console.log("productId:", productId);
    const qty = this.quantity;
    const data = localStorage.getItem('userData');
    if(data){
      const userData = JSON.parse(data);
      this.userId = userData.user_id;
      console.log("userid:", this.userId);
    
    this.cartService.addToCart(this.userId,productId,qty).subscribe( data => {
      this.cartService.loadCart(this.userId)
      console.log("user added sucessfully !");
    })
    // this.cartService.addItem(newCartItem);
  }else{
    const guestId = this.generateGuestId();
    console.log("guestId:", guestId);
    const productId = this.itemData.id;
    const qty = this.quantity;
    
    this.cartService.addToCartGuestUser(guestId,productId,qty).subscribe( data => {
      this.cartService.loadCart(guestId)
      console.log("user added sucessfully !");
    })
    alert('please login to addtoCart');
  }
  }
  generateGuestId() {
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
      guestId = 'guest_' + Math.random().toString(36).substring(2) + Date.now();
      localStorage.setItem('guestId', guestId);
    }
    return guestId;
  }
  

  buyNow() {
    // Buy now logic
  }
}
