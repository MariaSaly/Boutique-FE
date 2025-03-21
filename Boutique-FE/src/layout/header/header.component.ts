import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../app/cart.service';
import { Router } from '@angular/router';
import { SearchService } from '../../service/searchService';
import { SharedService } from '../../service/sharedService';
import { MatMenuModule } from '@angular/material/menu';
import { query } from '@angular/animations';
import { AuthService } from '../../shared/authService';
import { ScrollService } from '../../service/scroll.service';
import { ScrollCommunicationService } from '../../service/scroll-communication.service';
@Component({
  selector: 'app-header',
  imports: [MatIconModule,CommonModule,MatMenuModule],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showSearchBar = false;
  cartCount:number =0;
  showCategoryContent = false;
  showSamePinchContent = false;
  userId: any;
  
  constructor( private scrollService: ScrollCommunicationService,private scrollServices: ScrollService,private cdRef: ChangeDetectorRef,private authService:AuthService, private SharedService:SharedService,private cartService:CartService , private router:Router , private searchService:SearchService){

  }
  @ViewChild('newBestSection') newBestSection!: ElementRef;
  @ViewChild('newArrivalsSection') newArrivalsSection!: ElementRef;
  goToNewArrivals() {
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        this.scrollService.notifyNewArrivalsClick();
        console.log("📢 Sent scroll event to HomepageComponent!");
      }, 500);
    });
  }
  
  goToBestSellers(){
    this.router.navigate(['/home']).then(()=>{
      setTimeout(() => {
        this.scrollService.notifyBestSellersClick();
        console.log("📢 Sent scroll event to HomepageComponent!");
      }, 500);
   
    });
  }
  

  ngOnInit(): void {
    this.setFlagFromLocalStorage();
    // this.cartService.currentItems.subscribe( data => {
    //  console.log("data:", data);
    //  this.cartCount = data.length;
    // })

   
      let userId:string = '';
      const guestData = localStorage.getItem('guestId');
    const data = localStorage.getItem('userData');
    if(data){
      const userData = JSON.parse(data);
      this.userId = userData.user_id
    }
  
    if(this.userId){
      userId = this.userId;
    }
    else{
     
      userId = guestData || ''
    }
    if(this.userId && guestData){
      this.cartService.loadCartGuest(this.userId,guestData);
      this.cartService.cartCount$.subscribe( data => {
        this.cartCount = data;
      })
    }
    else{
      this.cartService.loadCart(userId)
      this.cartService.cartCount$.subscribe( data => {
        this.cartCount = data;
      })
    }
    this.SharedService.refreshCart$.subscribe( () =>{
      this.cartService.loadCart(userId)
    })
   
   }
   toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar; // Toggles the search bar visibility
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
  goToCart() {
    this.router.navigate(['/cart']);
  }

  onSearch(query: string): void {
    console.log("I am in search query", query);
    if(query.trim()){
        this.router.navigate(['/search'],{queryParams:{query}})
       }
    this.searchService.updateSearchQuery(query);
  
  }
  viewProfile() {
    this.router.navigate(['/profile']);
    console.log('Viewing profile...');
    // You can navigate to the profile page or show profile data here
  }
  login(){
    this.router.navigate(['/login'])
  }

  // Method to log out
  logout() {
    console.log('Logging out...');
    this.authService.logout()
    // Handle logout logic here (e.g., clearing tokens, redirecting, etc.)
    // if(query.trim()){
    //   this.router.navigate(['/search'],{queryParams:{query}})
    // }
   // this.searchService.updateSearchQuery(query);
  }
}
