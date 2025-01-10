import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../app/cart.service';
import { Router } from '@angular/router';
import { SearchService } from '../../service/searchService';

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
  constructor( private cartService:CartService , private router:Router , private searchService:SearchService){

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
  onSearch(query:string):void{
    console.log("Iam in searcg query",query)
    this.searchService.updateSearchQuery(query);
  }
}
