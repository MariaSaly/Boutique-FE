import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../../app/cart.service';
import { HttpService } from '../../../service/httpService';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saree',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  standalone:true,
  templateUrl: './saree.component.html',
  styleUrl: './saree.component.css'
})
export class SareeComponent  implements OnInit{
  public url = environment.localUrl;
  filteredData: any[] =[];
  items: any[]= [];
  constructor(private router:Router , private searchService:SearchService,private cdr: ChangeDetectorRef, private cartService:CartService , private httpservice:HttpService , private httpClient:HttpClient){}
  ngOnInit(): void {
    this.getSareeItems();
    this.searchService.searchQuery$.subscribe((query) => {
      console.log('query:', query);
      this.filteredData = this.items.filter((item) => {
        return Object.values(item).some((val: any) => {
          // Check if val is an array or an object
          if (Array.isArray(val)) {
            // Handle arrays: you can join array elements or just return a relevant string
            return val.join(' ').toLowerCase().includes(query.toLowerCase());
          } else if (val && typeof val === 'object') {
            // Handle objects: convert object to a string or you can further inspect the object
            return JSON.stringify(val).toLowerCase().includes(query.toLowerCase());
          } else if (val != null) {
            // Handle strings, numbers, and other primitives
            return val.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false; // Return false if val is null or undefined
        });
      });
    });
  }
  getSareeItems(){
    this.httpservice.get(`${this.url}/api/items/getItem`).subscribe( (data:any) => {
     console.log("data:", data);
     this.items = data;
     const items:any = data;
    
     this.filteredData = [...items];
    })
   }
   fetchImageForItems(Item: any): void {
    let imagePath = Item.imageUrl;
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
              this.cdr.detectChanges();
            } else {
              console.error('FileReader result is empty');
              Item.imageDataUrl = 'path/to/default-image.jpg'; // Fallback image
            }
          };
          reader.onerror = () => {
            console.error('FileReader error occurred');
            Item.imageDataUrl = 'path/to/default-image.jpg'; // Fallback image
          };
        },
        error => {
          console.error(`Error fetching image for item ${Item.id}:`, error);
          Item.imageDataUrl = 'path/to/default-image.jpg'; // Fallback image
        }
      );
  }
  
  products = [
    {
      title: 'Product 1',
      description: 'Description for product 1',
      price: 100,
      images: ['assets/images/bg1.png', 'assets/images/bg2.png', 'assets/images/bg3.png']
    },
    {
      title: 'Product 2',
      description: 'Description for product 2',
      price: 150,
      images: ['assets/images/bg4.png']
    },
  ];



  

  // State management
  selectedProduct: any = null;
  selectedSize: string | null = null;
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  customText: string = '';
  quantity: number = 1;

  // Select a card and display its details
  selectCard(index: number): void {
    this.selectedProduct = this.filteredData[index];
    this.selectedSize = null; // Reset size selection
    this.customText = ''; // Reset customization text
    this.quantity = 1; // Reset quantity
    this.router.navigate([`/viewsaree/${this.selectedProduct.id}`])
    
  }

  // Select size
  selectSize(size: string): void {
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
  
  // Add to cart action
  addToCart(): void {
    console.log("Im in add to cart function");
    const newCartItem = {
      product: this.selectedProduct,
      qty:this.quantity
    }
    // this.cartService.addItem(newCartItem);
  }
  // Buy now action
  buyNow(): void {
    alert(
      `Buying now: ${this.selectedProduct.title}\nSize: ${this.selectedSize || 'None'}\nQuantity: ${
        this.quantity
      }\nCustomization: ${this.customText}`
    );
  }
  currentIndexes: number[] = [];

  nextImage(cardIndex: number, images: string[]) {
    if (images.length > 0) {
      this.currentIndexes[cardIndex] = (this.currentIndexes[cardIndex] + 1) % images.length;
    }
  }

  previousImage(cardIndex: number, images: string[]) {
    if (images.length > 0) {
      this.currentIndexes[cardIndex] =
        (this.currentIndexes[cardIndex] - 1 + images.length) % images.length;
    }
  }
  images: string[] = [
    'assets/images/bg1.png',
    'assets/images/bg2.png',
    'assets/images/bg3.png' // Add more image URLs as needed
  ];
}
