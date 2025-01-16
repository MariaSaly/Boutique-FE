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
  items: unknown;
  constructor(private router:Router , private searchService:SearchService,private cdr: ChangeDetectorRef, private cartService:CartService , private httpservice:HttpService , private httpClient:HttpClient){}
  ngOnInit(): void {
    this.getSareeItems();
    this.searchService.searchQuery$.subscribe((query) => {
      console.log('query:', query);
      this.filteredData = this.products.filter((item) => {
        return Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }
  getSareeItems(){
    this.httpservice.get(`${this.url}/api/items/getItem`).subscribe( data => {
     console.log("data:", data);
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
      imageUrl: '',
      title: 'Banarass',
      description: 'Banarass.',
      price: 99.99,
    },
    {
      imageUrl: 'assets/images/bg1.png',
      title: 'Silky Cotton',
      description: 'Comfortable and stylish .',
      price: 49.99,
    },
    {
      imageUrl: 'path/to/image3.jpg',
      title: 'Silk',
      description: 'Elegant  for weddings.',
      price: 149.99,
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
}
