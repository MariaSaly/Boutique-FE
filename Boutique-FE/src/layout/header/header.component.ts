import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../app/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,CommonModule],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showSearchBar = false;
  cartCount:number =0;
  constructor( private cartService:CartService , private router:Router){

  }
  ngOnInit(): void {
    this.cartService.currentItems.subscribe( data => {
     console.log("data:", data);
     this.cartCount = data.length;
    })
   }
  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }
  goToCart(){
    this.router.navigate(['/cart'])
  }
}
