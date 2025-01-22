import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router:Router){}

smallImages = [
  './assets/images/bg1.png',
  './assets/images/bg1.png',
  './assets/images/bg1.png',
  './assets/images/bg1.png',
]; // Add your image paths here
selectedImage = this.smallImages[0]; // Default to the first image

selectImage(image: string): void {
  this.selectedImage = image;
}
images: string[] = [
  '../../assets/images/bg2.png',
  '../../assets/images/saree.png',
  '../../assets/images/saree2.png',
  '../../assets/images/halfsaree.jpg'
];
currentIndex: number = 0;

ngOnInit(): void {
  this.updateImage();
}

updateImage(): void {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.style.backgroundImage = `url(${this.images[this.currentIndex]})`;
  }
}

prevImage(): void {
  this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  this.updateImage();
}

nextImage(): void {
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
  this.updateImage();
}
saree(){
  this.router.navigate(['saree'])
}
bridalcostumes(){
  this.router.navigate(['bridalcostumes'])
}
bridalsquade(){
  this.router.navigate(['bridalsquade'])
}
cousinsquade(){
  this.router.navigate(['cousinsquade'])
}
familycombo(){
  this.router.navigate(['familycombo'])
}
momanddaughter(){
  this.router.navigate(['momanddaughter'])
}
menswear(){
  this.router.navigate(['menswear'])
}
}
