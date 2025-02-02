import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../../app/cart.service';
import { HttpService } from '../../../service/httpService';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bridalcostumes',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './bridalcostumes.component.html',
  styleUrl: './bridalcostumes.component.css'
})
export class BridalcostumesComponent {
 
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
    }
  
    getSareeItems(): void {
      this.httpService.get(`${this.url}/api/items/getItem?category=bridalcostumes&isCustomizable=true`).subscribe((data: any) => {
        this.items = data;
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
      this.router.navigate([`/bridalcostumes/${selectedProduct.id}`]);
    }
  }


