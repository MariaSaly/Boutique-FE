import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../app/cart.service';

@Component({
  selector: 'app-viewsaree',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  standalone:true,
  templateUrl: './viewsaree.component.html',
  styleUrl: './viewsaree.component.css'
})
export class ViewsareeComponent {
  constructor( private cartService:CartService){

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
    const newCartItem = {
      product: this.selectedProduct,
      qty:this.quantity
    }
    this.cartService.addItem(newCartItem);
  }

  buyNow() {
    // Buy now logic
  }
}
