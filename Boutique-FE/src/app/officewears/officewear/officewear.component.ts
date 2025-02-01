import { Component } from '@angular/core';
import { environment } from '../../../environment';
import { Router } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../cart.service';
import { HttpService } from '../../../service/httpService';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officewear',
  imports: [FormsModule,CommonModule],
  standalone:true,
  templateUrl: './officewear.component.html',
  styleUrl: './officewear.component.css'
})
export class OfficewearComponent {
 public url = environment.localUrl;
    
    filteredData: any[] = [];
    items: any[] = [];
    currentIndexes: number[] = []; // Added this to track current image indexes
  
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
  
  
    // Hover logic to pause carousel
    onHover(index: number) {
      console.log('Hovered over product:', this.filteredData[index].name);
      console.log('Hovered over product:', this.filteredData[index].name);
    }
  
    onLeave(index: number) {
      console.log('Left hover for product:', this.filteredData[index].name);
    }
  
   
  
    getSareeItems(): void {
      this.httpService.get(`${this.url}/api/items/getItem?category=officewear?isCustomizable='false'`).subscribe((data: any) => {
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
      this.router.navigate([`/officewear/${selectedProduct.id}`]);
    }
}
