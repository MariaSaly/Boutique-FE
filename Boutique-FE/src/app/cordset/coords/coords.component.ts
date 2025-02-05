import { Component } from '@angular/core';
import { environment } from '../../../environment';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../cart.service';
import { HttpService } from '../../../service/httpService';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coords',
  imports: [FormsModule,CommonModule,RouterModule],
  standalone:true,
  templateUrl: './coords.component.html',
  styleUrl: './coords.component.css'
})
export class CoordsComponent {
 public url = environment.localUrl;
    
    filteredData: any[] = [];
    items: any[] = [];
    // Added this to track current image indexes
  
    constructor(
      private router: Router,
      private searchService: SearchService,
      private cartService: CartService,
      private httpService: HttpService,
      private httpClient: HttpClient
    ) {}
  
    ngOnInit(): void {
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
      this.httpService.get(`${this.url}/api/items/getItem?category=coords&isCustomizable=false`).subscribe((data: any) => {
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
      this.router.navigate([`/coords/${selectedProduct.id}`]);
    }
}
