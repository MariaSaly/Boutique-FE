import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchServiceService } from '../search-service.service';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule , FormsModule],
  standalone:true,
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
  public url = environment.localUrl;
  searchQuery:string ='';
  filteredData:any[]=[];
  
    items: any[] = [];
    currentIndexes: number[] = []; 
  constructor( private route:ActivatedRoute , private searchService:SearchServiceService ,private router:Router){ }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      console.log("params:", params)
      this.searchQuery = params['query'] || ''
      this.performSearch(this.searchQuery);
    })
  }
  onHover(index: number) {
    console.log('Hovered over product:', this.filteredData[index].name);
    console.log('Hovered over product:', this.filteredData[index].name);
  }

  onLeave(index: number) {
    console.log('Left hover for product:', this.filteredData[index].name);
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
    const selectedProduct:any = this.filteredData[index];
    const category = selectedProduct.category;
    console.log("category:", category);
    console.log("data:", this.filteredData[index] );
    this.router.navigate([`/${category}/${selectedProduct.id}`]);
  }
  performSearch(query:string):void{
     this.searchService.search(query).subscribe( data => {
      console.log("data:",data);
      this.filteredData = data;  
      this.filteredData.forEach((_, index) => {
        this.currentIndexes[index] = 0; // Initially show the first image
      });
     })
  }

}
