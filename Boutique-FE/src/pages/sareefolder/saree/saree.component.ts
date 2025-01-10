import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../../app/cart.service';

@Component({
  selector: 'app-saree',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  standalone:true,
  templateUrl: './saree.component.html',
  styleUrl: './saree.component.css'
})
export class SareeComponent  implements OnInit{
  constructor(private router:Router , private searchService:SearchService, private cartService:CartService){}

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
  filteredData: any =[...this.products];
  ngOnInit(): void {
    this.searchService.searchQuery$.subscribe((query) => {
      console.log('query:', query);
      this.filteredData = this.products.filter((item) => {
        return Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }

  // State management
  selectedProduct: any = null;
  selectedSize: string | null = null;
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  customText: string = '';
  quantity: number = 1;

  // Select a card and display its details
  selectCard(index: number): void {
    this.selectedProduct = this.products[index];
    this.selectedSize = null; // Reset size selection
    this.customText = ''; // Reset customization text
    this.quantity = 1; // Reset quantity
    this.router.navigate(['/viewsaree'])
    
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
    this.cartService.addItem(newCartItem);
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
