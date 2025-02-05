import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../../app/cart.service';
import { HttpService } from '../../../service/httpService';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-momand-daughter',
  imports: [FormsModule,CommonModule,RouterModule],
  standalone:true,
  templateUrl: './momand-daughter.component.html',
  styleUrl: './momand-daughter.component.css'
})
export class MomandDaughterComponent {
  currentRoute: string = '';  
    public url = environment.localUrl;
    
    filteredData: any[] = [];
    items: any[] = [];
   
  
    constructor(
      private router: Router,
      private searchService: SearchService,
      private cartService: CartService,
      private httpService: HttpService,
      private httpClient: HttpClient,
      private activatedRoute: ActivatedRoute,
    ) {}
  
    ngOnInit(): void {
      this.setRoute();

      // Listen for changes in the route path to update the currentRoute dynamically
      this.router.events.subscribe(() => {
        this.setRoute();
      });
      this.getSareeItems();
  
      this.searchService.searchQuery$.subscribe((query) => {
        this.filteredData = this.items.filter((item) => {
          return Object.values(item).some((val: any) => {
            if (Array.isArray(val)) {
              return val.join(' ').toLowerCase().includes(query.toLowerCase());
            } else if (val && typeof val === 'object') {
              return JSON.stringify(val).toLowerCase().includes(query.toLowerCase());
            } else if (val != null) {
              return val.toString().toLowerCase().includes(query.toLowerCase());
            }
            return false;
          });
        });
      });
      this.filteredData.forEach((_, index) => {
        this.currentIndexes[index] = 0; // Initially show the first image
      });
      console.log(this.currentIndexes);
    }
    private setRoute(): void {
      // Access the current route path using the router's state
      this.currentRoute = this.router.url; // This will give the full URL
    }
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
  
  
  
   
  
    getSareeItems(): void {
      this.httpService.get(`${this.url}/api/items/getItem?category=momanddaughter&isCustomizable=true`).subscribe((data: any) => {
        this.items = data;
        console.log("data:", this.items);
        this.filteredData = [...this.items];
        this.currentIndexes = this.filteredData.map(() => 0); // Initialize image indexes
      });
    }
  
    nextImage(cardIndex: number, images: string[]): void {
      if (images.length > 1) {
        this.currentIndexes[cardIndex] =
          (this.currentIndexes[cardIndex] + 1) % images.length;
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
      this.router.navigate([`/momanddaughter/${selectedProduct.id}`]);
    }
  }
  

