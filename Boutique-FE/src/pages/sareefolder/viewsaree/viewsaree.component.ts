import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewsaree',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  standalone:true,
  templateUrl: './viewsaree.component.html',
  styleUrl: './viewsaree.component.css'
})
export class ViewsareeComponent {
  selectedProduct = {
    title: 'Aamina Saree',
    description: 'A beautiful saree for special occasions.',
    price: 99.99
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

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    // Add to cart logic
  }

  buyNow() {
    // Buy now logic
  }
}
