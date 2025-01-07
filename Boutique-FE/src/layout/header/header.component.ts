import { Component, OnInit } from '@angular/core';
import { CartService } from '../../app/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartCount:number =0;
constructor( private cartService:CartService , private router:Router){

}
  ngOnInit(): void {
   this.cartService.currentItems.subscribe( data => {
    console.log("data:", data);
    this.cartCount = data.length;
   })
  }
  goToCart(){
    this.router.navigate(['/cart'])
  }
}
