import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../service/homesharedservice';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environment';
import { HttpService } from '../../service/httpService';
import { ScrollService } from '../../service/scroll.service';
import { ScrollCommunicationService } from '../../service/scroll-communication.service';

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule,MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent  implements OnInit, OnDestroy {
  private url = environment.localUrl;
  showCategoryContent = false;
  showSamePinchContent = false;
  interval: any;
  showNewArrivals = false; 
  items: any[] = [];
  @ViewChild('newArrivalsSection') newArrivalsSection!: ElementRef;

  filteredData: any[] = [];
  newarrivals: any;
  constructor(private scrollService: ScrollCommunicationService, private scrollServices: ScrollService,private router:Router,private sharedService: SharedService, private cdRef: ChangeDetectorRef,private httpService: HttpService, ){}
  showSection() {
    this.showNewArrivals = true;
    console.log("🔹 showNewArrivals is now:", this.showNewArrivals);
  }

  
  
  
  
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
  onbtn(){
    this.router.navigate(['/MoksheDestination'])
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
  this.getProducts();
  this.scrollService.newArrivalsClicked$.subscribe(() => {
    console.log("✅ HomepageComponent: Received scroll event!");
    
    // Delay scrolling to allow time for rendering
    setTimeout(() => {
      this.scrollToNewArrivals();
    }, 500);
  });
  this.scrollService.bestSellersClicked$.subscribe(() => {
    console.log("🔥 HomepageComponent: Received Best Sellers scroll event!");
    setTimeout(() => {
      this.scrollToBestSeller();
    }, 500);
  });
}
ngAfterViewInit(): void {
  console.log('🔹 AfterViewInit: ViewChild should now be available.');
}

scrollToNewArrivals(retries = 10, delay = 500) {
  const section = document.getElementById('newArrivalsSection'); // Update with correct ID
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else if (retries > 0) {
    console.warn(`Retrying scroll... ${retries} attempts left`);
    setTimeout(() => this.scrollToNewArrivals(retries - 1, delay), delay);
  } else {
    console.error('ERROR: newArrivalsSection not found in DOM after multiple attempts.');
  }
}
scrollToBestSeller(retries = 10, delay = 500) {
  const section = document.getElementById('newBestSection'); // Correct ID
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else if (retries > 0) {
    console.warn(`Retrying scroll... ${retries} attempts left`);
    setTimeout(() => this.scrollToBestSeller(retries - 1, delay), delay); // ✅ Correct function call
  } else {
    console.error('ERROR: newBestSection not found in DOM after multiple attempts.');
  }
}

getProducts(){
this.httpService.get<any>(`${this.url}/api/items/getItem?subcategory=newarrivals`).subscribe(
  data => {
    console.log("new arrival data:", data);
    this.newarrivals = data;
  }
)
}getSareeItems(): void {
  this.httpService.get(`${this.url}/api/items/getItem?subcategory=newarrivals`).subscribe((data: any) => {
    console.log("new arrival data:", data);
    this.items = data;
    this.filteredData = [...this.items];
    this.currentIndexes = this.filteredData.map(() => 0); // Initialize image indexes
  });
}

// nextImage(cardIndex: number, images: string[]): void {
//   if (images.length > 1) {
//     this.currentIndexes[cardIndex] =
//       (this.currentIndexes[cardIndex] + 1) % images.length;
//   }
// }
currentIndexes: { [key: number]: number } = {}; // Track the index of each product image
hoverIntervals: { [key: number]: any } = {};
  // Hover logic to pause carousel
  onHover(index: number, images: string[]) {
    if (images.length > 1) {
      this.hoverIntervals[index] = setInterval(() => {
        this.currentIndexes[index] = (this.currentIndexes[index] + 1) % images.length;
      }, 1000); // Change image every second
    }
  }

  onLeave(index: number) {
    if (this.hoverIntervals[index]) {
      clearInterval(this.hoverIntervals[index]); // Stop the interval
      delete this.hoverIntervals[index];
    }
  }
previousImage(cardIndex: number, images: string[]): void {
  if (images.length > 1) {
    this.currentIndexes[cardIndex] =
      (this.currentIndexes[cardIndex] - 1 + images.length) % images.length;
  }
}

selectCard(index: number): void {
  const selectedProduct = this.filteredData[index];
  this.router.navigate([`/bridalsquade/${selectedProduct.id}`]);
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
