import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpService } from '../../../service/httpService';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpServiceWithHeaders } from '../../../service/httpServiceForAdmin';

@Component({
  selector: 'app-list-items',
  standalone:true,
  imports: [CommonModule , FormsModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent implements OnInit {
  public url = environment.localUrl;
  showViewMore = false; // Flag to show "View More" button
  filteredItems: any[] = [];
  searchQuery: any;
  currentIndex: number = 0;
  items: any[] = []; // Array to store all items

  constructor(
    private router: Router,
    private http: HttpServiceWithHeaders,
    private cdr: ChangeDetectorRef,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.http.get<any>(`${this.url}/api/items/getItem`).subscribe({
      next: (response) => {
        console.log('data:', response);
        this.items = response;
        this.filteredItems = this.items.slice(0, 4); // Show the first 4 items initially
        this.showViewMore = this.items.length > 4;
      },
      error: (error) => {
        console.log(`Error in getting the Data:${error}`);
      }
    });
  }

  // Handle previous image
  prevImage(item: any) {
    const index = this.filteredItems.indexOf(item);
    if (index !== -1) {
      this.currentIndex = (this.currentIndex - 1 + item.imageUrl.length) % item.imageUrl.length;
    }
  }

  // Handle next image
  nextImage(item: any) {
    const index = this.filteredItems.indexOf(item);
    if (index !== -1) {
      this.currentIndex = (this.currentIndex + 1) % item.imageUrl.length;
    }
  }

  filterItems() {
    if (this.searchQuery.trim()) {
      this.filteredItems = this.items.filter((item) =>
        item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredItems = this.items.slice(0, 4); // Reset to first 4 if no search
    }
  }

  fetchImageForItems(Item: any): void {
    let imagePath = Item.imageUrl;
    const normalizedUrl = `${this.url.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`;
    console.log('Fetching image from:', normalizedUrl);
    
    this.httpclient.get(normalizedUrl, { responseType: 'blob' })
      .subscribe(
        (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onload = () => {
            if (reader.result) {
              Item.imageDataUrl = reader.result as string;
              this.cdr.markForCheck();
            } else {
              console.error('FileReader result is empty');
            }
          };
          reader.onerror = () => {
            console.error('FileReader error occurred');
          };
        },
        error => {
          console.error(`Error fetching image for item ${Item.id}:`, error);
        }
      );
  }

  confirmDelete(item: any) {
    const confirmDelete = window.confirm('Are you sure you want to Delete!');
    if (confirmDelete) {
      this.deleteItem(item.id);
    }
  }

  deleteItem(itemId: any) {
    this.http.delete(`${this.url}/api/items/deleteItem/${itemId}`).subscribe(response => {
      if (response) {
        alert(`${itemId} deleted successfully`);
        this.getItem();
      }
    });
  }

  onCardClick(id: string, action: 'view' | 'edit'): void {
    const route = action === 'view' ? `item/${id}/view` : `item/${id}/edit`;
    this.router.navigate([route]);
  }

  // "View More" functionality
  viewMoreCards() {
    const currentLength = this.filteredItems.length;
    const nextItems = this.items.slice(currentLength, currentLength + 4); // Load next 4 items
    this.filteredItems = [...this.filteredItems, ...nextItems]; // Append new items

    // Hide the View More button if all items are loaded
    if (this.filteredItems.length >= this.items.length) {
      this.showViewMore = false;
    }
  }

  add() {
    this.router.navigate(['/item/add']);
  }

  // Example of adding an item when the form is submitted
  addItem(item: { imageUrl: string; description: string; isCustomizable: boolean }) {
    this.items.push(item);
  }
}
