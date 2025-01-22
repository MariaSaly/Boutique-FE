import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../../service/searchService';
import { CartService } from '../../../app/cart.service';
import { HttpService } from '../../../service/httpService';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saree',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Ensure CommonModule is imported here
  templateUrl: './saree.component.html',
  styleUrls: ['./saree.component.css'],
})
export class SareeComponent implements OnInit {
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
      this.currentIndexes = this.filteredData.map(() => 0); 
      console.log('Filtered Data:', this.filteredData); 
    });
  }
  
  getSareeItems(): void {
    this.httpService.get(`${this.url}/api/items/getItem`).subscribe((data: any) => {
      this.items = data.map((item: any) => ({
        ...item,
        images: Array.isArray(item.imageUrl) ? item.imageUrl : [], // Ensure images is an array
      }));
      this.filteredData = [...this.items];
      this.currentIndexes = this.filteredData.map(() => 0); // Initialize image indexes
      console.log('Fetched Items:', this.items); // Debug
    });
  }
  
  nextImage(cardIndex: number, images: string[]): void {
    if (images?.length > 1) {
      this.currentIndexes[cardIndex] =
        (this.currentIndexes[cardIndex] + 1) % images.length;
    }
    console.log('Next Image Index:', this.currentIndexes[cardIndex]); // Debug
  }
  
  previousImage(cardIndex: number, images: string[]): void {
    if (images?.length > 1) {
      this.currentIndexes[cardIndex] =
        (this.currentIndexes[cardIndex] - 1 + images.length) % images.length;
    }
    console.log('Previous Image Index:', this.currentIndexes[cardIndex]); // Debug
  }
  
  





  selectCard(index: number): void {
    const selectedProduct = this.filteredData[index];
    this.router.navigate([`/viewsaree/${selectedProduct.id}`]);
  }
}
