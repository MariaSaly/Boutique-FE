import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../app/cart.service';
import { Router } from '@angular/router';
import { SearchService } from '../../service/searchService';
import { SharedService } from '../../service/sharedService';
import { MatMenuModule } from '@angular/material/menu';
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
  userId: any;
  constructor( private SharedService:SharedService,private cartService:CartService , private router:Router , private searchService:SearchService){

  }
  ngOnInit(): void {
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

  goToCart() {
    this.router.navigate(['/cart']);
  }

  onSearch(query: string): void {
    console.log("I am in search query", query);
    this.searchService.updateSearchQuery(query);
  
  }
  viewProfile() {
    this.router.navigate(['/profile']);
    console.log('Viewing profile...');
    // You can navigate to the profile page or show profile data here
  }

  // Method to log out
  logout() {
    console.log('Logging out...');
    // Handle logout logic here (e.g., clearing tokens, redirecting, etc.)
  }
}
