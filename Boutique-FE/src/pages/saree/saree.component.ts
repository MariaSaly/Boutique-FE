import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-saree',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  standalone:true,
  templateUrl: './saree.component.html',
  styleUrl: './saree.component.css'
})
export class SareeComponent {
  products = [
    {
      imageUrl: '',
      title: 'Saree',
      description: 'A beautiful saree for special occasions.',
      price: 99.99,
    },
    {
      imageUrl: 'path/to/image2.jpg',
      title: 'Kurthi Top',
      description: 'Comfortable and stylish Kurthi Top.',
      price: 49.99,
    },
    {
      imageUrl: 'path/to/image3.jpg',
      title: 'Lehenga',
      description: 'Elegant Lehenga for weddings.',
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
    this.selectedProduct = this.products[index];
    this.selectedSize = null; // Reset size selection
    this.customText = ''; // Reset customization text
    this.quantity = 1; // Reset quantity
    
  }

  // Select size
  selectSize(size: string): void {
    this.selectedSize = size;
  }
  increaseQuantity(): void {
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  // Add to cart action
  addToCart(): void {
    alert(
      `Added to cart: ${this.selectedProduct.title}\nSize: ${this.selectedSize || 'None'}\nQuantity: ${
        this.quantity
      }\nCustomization: ${this.customText}`
    );
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
