import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../service/homesharedservice';

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  showCategoryContent = false;
  showSamePinchContent = false;
  
  constructor(private router:Router,private sharedService: SharedService){}

 

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
  this.loadCategoryState(); // Load stored category state
  this.updateImage();
  this.subscribeToSharedService();
  this.handleBackNavigation();
}

loadCategoryState(): void {
  console.log("Loading category state...");

  const savedShowCategory = localStorage.getItem('showCategoryContent');
  const savedShowSamePinch = localStorage.getItem('showSamePinchContent');

  console.log("LocalStorage Retrieved:", {
    showCategoryContent: savedShowCategory,
    showSamePinchContent: savedShowSamePinch,
  });

  // ✅ Retrieve stored values or set default `false`
  this.showCategoryContent = savedShowCategory !== null ? JSON.parse(savedShowCategory) : false;
  this.showSamePinchContent = savedShowSamePinch !== null ? JSON.parse(savedShowSamePinch) : false;

  console.log("Final State After Loading:", {
    showCategoryContent: this.showCategoryContent,
    showSamePinchContent: this.showSamePinchContent,
  });
}


subscribeToSharedService(): void {
  this.sharedService.categoryContent$.subscribe((value) => {
    this.showCategoryContent = value;
    localStorage.setItem('showCategoryContent', JSON.stringify(value)); // ✅ Save changes
  });

  this.sharedService.samePinchContent$.subscribe((value) => {
    this.showSamePinchContent = value;
    localStorage.setItem('showSamePinchContent', JSON.stringify(value)); // ✅ Save changes
  });
}



handleBackNavigation(): void {
  window.addEventListener('popstate', () => {
    this.loadCategoryState();
  });
}


// Call this function inside ngOnInit
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
nine(){
  this.router.navigate(['nine'])
}
coords(){
  this.router.navigate(['coords'])
}
halfsaree(){
  this.router.navigate(['halfsaree'])
}
officewear(){
  this.router.navigate(['officewear'])
}
plussize(){
  this.router.navigate(['plussize'])
}
leggings(){
  this.router.navigate(['leggins'])
}
}
