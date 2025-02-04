import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomepageComponent  implements OnInit, OnDestroy {
  showCategoryContent = false;
  showSamePinchContent = false;
  interval: any;
  constructor(private router:Router,private sharedService: SharedService, private cdRef: ChangeDetectorRef ){}

  startImageRotation() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 6000); // Change image every 5 seconds
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
 

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
  'https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg',
  'https://i.pinimg.com/originals/ec/6a/19/ec6a19a588615a57fd006893f4599c05.jpg',
  'https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg'
];
// images: string[] = [
//   '../../assets/images/bg2.png',
//   '../../assets/images/saree.png',
//   '../../assets/images/saree2.png',
//   '../../assets/images/halfsaree.jpg'
// ];
currentIndex: number = 0;

ngOnInit(): void {
  this.setFlagFromLocalStorage();
  this.updateImage();
  this.startImageRotation();
  this.handleBackNavigation();
}

setFlagFromLocalStorage() {
  const selectedFlag = localStorage.getItem('selectedFlag');
  console.log('Selected Flag from LocalStorage:', selectedFlag);

  if (selectedFlag === 'customize') {
    this.showCategoryContent = true;
    this.showSamePinchContent = false;
  } else {
    this.showCategoryContent = false;
    this.showSamePinchContent = true;
  }

  // Manually trigger change detection after setting the flags
  this.cdRef.detectChanges();

  console.log('Final State After Loading:', {
    showCategoryContent: this.showCategoryContent,
    showSamePinchContent: this.showSamePinchContent
  });
}








handleBackNavigation(): void {
  window.addEventListener('popstate', () => {
    console.log("Back navigation detected. Reloading category state...");
    this.setFlagFromLocalStorage();
    // Apply fade-in effect
  
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
