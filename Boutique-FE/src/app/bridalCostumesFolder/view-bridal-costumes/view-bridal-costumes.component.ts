import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../app/cart.service';
import { HttpService } from '../../../service/httpService';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';

@Component({
  selector: 'app-view-bridal-costumes',
  imports: [CommonModule , FormsModule,RouterModule],
  standalone:true,
  templateUrl: './view-bridal-costumes.component.html',
  styleUrl: './view-bridal-costumes.component.css'
})
export class ViewBridalCostumesComponent {
  @Input() imageUrls: string[] = [];
    userId: any;
    interval:any;
    itemId: string | null = '';
    public url = environment.localUrl;
     size:string = 'M'
    itemData: any;
    constructor(private toastService:ToastrService
,      private router:Router,private cartService:CartService , private http:HttpService  ,private cdr: ChangeDetectorRef, private route:ActivatedRoute , private httpClient:HttpClient , ){
  
    }
    ngOnInit(): void {
      this.itemId = this.route.snapshot.paramMap.get('id');
      console.log("id:", this.itemId);
      if(this.itemId){
        this.getItemByID();
      }
    }
    sizes = ['S', 'M', 'L','XL','2XL','3XL','4XL','5XL','6XL',];
    isSizeGuideOpen = false;
 
     selectSize(size: string) {
       this.selectedSize = size;
     }
   
     sizeGuide = [
       {Size: 'S', chest: '32"', waist: '28"', length: '55"' },
       { Size: 'M', chest: '34"', waist: '30"', length: '55"' },
       { Size: 'L', chest: '36"', waist: '32"', length: '55"' },
       { Size: 'XL', chest: '38"', waist: '34"', length: '55"' },
       { Size: '2XL', chest: '40"', waist: '36"', length: '55"' },
       { Size: '3XL', chest: '42"', waist: '38"', length: '55"' },
       { Size: '4XL', chest: '44"', waist: '40"', length: '55"' },
       { Size: '5XL', chest: '46"', waist: '42"', length: '55"' },
       { Size: '6XL', chest: '48"', waist: '42"', length: '55"' },
     ];
   
     openSizeGuide() {
       this.isSizeGuideOpen = true;
     }
   
     closeSizeGuide() {
       this.isSizeGuideOpen = false;
     }
    getItemByID(){
      this.http.get(`${this.url}/api/items/getItemById/${this.itemId}`).subscribe( data => {
        console.log("data:", data);
        this.itemData = data;
        if (this.itemData?.imageUrl?.length > 1) {
          this.startImageRotation();
        }
      
         
      })
    }
    startImageRotation() {
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.itemData.imageUrl.length;
      }, 5000); // Slide every 5 seconds
    }
  
    ngOnDestroy() {
      if (this.interval) {
        clearInterval(this.interval);
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
  
   
    selectedSize: string = 'M';
  
    customText: string = '';
    quantity: number = 0;
  
    selectImage(index: number) {
      this.currentIndex = index;
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
      
      this.cartService.addToCart(this.userId,productId,this.selectedSize,qty).subscribe( data => {
        this.cartService.loadCart(this.userId)
        console.log("user added sucessfully !");
        this.toastService.success('Cart added Sucessfully!');
        this.router.navigate(['/cart']);
      })
      // this.cartService.addItem(newCartItem);
    }else{
      const guestId = this.generateGuestId();
      console.log("guestId:", guestId);
      const productId = this.itemData.id;
      const qty = this.quantity;
      
      this.cartService.addToCartGuestUser(guestId,productId,this.selectedSize,qty).subscribe( data => {
        this.cartService.loadCart(guestId)
        console.log("user added sucessfully !");
        this.toastService.success('Cart added Sucessfully!');
        this.router.navigate(['/cart']);
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
      localStorage.setItem('customData',JSON.stringify(this.customText));
    
      const productId = this.itemData.id;
      console.log("productId:", productId);
      const qty = this.quantity;
      const data = localStorage.getItem('userData');
      if(data){
        const userData = JSON.parse(data);
        this.userId = userData.user_id;
        console.log("userid:", this.userId);
      
      this.cartService.addToCart(this.userId,productId,this.selectedSize,qty).subscribe( data => {
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
      
      this.cartService.addToCartGuestUser(guestId,productId,this.selectedSize,qty).subscribe( data => {
        this.cartService.loadCart(guestId)
        console.log("user added sucessfully !");
        this.router.navigate(['/cart']);
      })
      //alert('please login to addtoCart');
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
    shareImage() {
      if (!this.itemData) {
        alert("Product data is not available.");
        return;
      }
    
      const productName = this.itemData.name;
      const productDescription = this.itemData.description;
      const productPrice = this.itemData.price;
    
      // ✅ Get the correct base URL (Avoids localhost issue)
      let liveBaseUrl = window.location.origin;
    
      if (liveBaseUrl.includes("localhost")) {
        liveBaseUrl = "https://Mokshedestination.com"; // Replace with your actual live domain
      }
    
      const productPageUrl = `${liveBaseUrl}/saree/${this.itemData.id}`;
    
      // ✅ Format text properly to ensure clickable links
      const shareText = `${productName}\n${productDescription}\n💰 Price: ₹${productPrice}\n\n🔗 ${productPageUrl}`;
    
      if (navigator.share) {
        navigator
          .share({
            title: productName,
            text: shareText,
            url: productPageUrl,
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.error("Sharing failed:", error));
      } else {
        // ✅ WhatsApp Share Link (Forcing Clickable Link)
        const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    
        window.open(whatsappShareUrl, "_blank");
      }
    }

  }
  

