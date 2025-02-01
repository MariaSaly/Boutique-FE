import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../cart.service';
import { HttpService } from '../../../service/httpService';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewninenineninecostumes',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './viewninenineninecostumes.component.html',
  styleUrl: './viewninenineninecostumes.component.css'
})
export class ViewninenineninecostumesComponent {

    userId: any;
    itemId: string | null = '';
    public url = environment.localUrl;
    itemData: any;
     size:string = 'M'
    constructor( private toastService:ToastrService,private router:Router,private cartService:CartService , private http:HttpService  ,private cdr: ChangeDetectorRef, private route:ActivatedRoute , private httpClient:HttpClient , ){
  
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
    quantity: number = 0;
  
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
      localStorage.setItem('customData',JSON.stringify(this.customText));
    
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
      
      this.cartService.addToCart(this.userId,productId,this.size,qty).subscribe( data => {
        this.cartService.loadCart(this.userId)
        console.log("user added sucessfully !");
        this.toastService.success("Cart Added Sucessfully!");
        this.router.navigate(['/cart']);
      })
      // this.cartService.addItem(newCartItem);
    }else{
      const guestId = this.generateGuestId();
      console.log("guestId:", guestId);
      const productId = this.itemData.id;
      const qty = this.quantity;
      
      this.cartService.addToCartGuestUser(guestId,productId,this.size,qty).subscribe( data => {
        this.cartService.loadCart(guestId)
        console.log("user added sucessfully !");
        this.router.navigate(['/cart']);
      })
      this.toastService.error('please login to addtoCart');
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
      localStorage.setItem('customData',JSON.stringify(this.customText));
    
      const productId = this.itemData.id;
      console.log("productId:", productId);
      const qty = this.quantity;
      const data = localStorage.getItem('userData');
      if(data){
        const userData = JSON.parse(data);
        this.userId = userData.user_id;
        console.log("userid:", this.userId);
      
      this.cartService.addToCart(this.userId,productId,this.size,qty).subscribe( data => {
        this.cartService.loadCart(this.userId)
        console.log("user added sucessfully !");
        this.router.navigate(['/cart']);
  
      })
      // this.cartService.addItem(newCartItem);
    }else{
      const guestId = this.generateGuestId();
      console.log("guestId:", guestId);
      const productId = this.itemData.id;
      const qty = this.quantity;
      
      this.cartService.addToCartGuestUser(guestId,productId,this.size,qty).subscribe( data => {
        this.cartService.loadCart(guestId)
        console.log("user added sucessfully !");
        this.router.navigate(['/cart']);
      })
     // alert('please login to addtoCart');
    }
    }
   
    images: string[] = [
     
    ];
    currentIndex: number = 0;
  
    nextImage() {
      if (this.images.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
    }
  
    previousImage() {
      if (this.images.length > 0) {
        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
      }
    }
}
