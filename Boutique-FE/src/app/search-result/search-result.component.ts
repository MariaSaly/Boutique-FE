import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchServiceService } from '../search-service.service';

@Component({
  selector: 'app-search-result',
  imports: [],
  standalone:true,
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
  searchQuery:string ='';
  filteredData:any[]=[];
  constructor( private route:ActivatedRoute , private searchService:SearchServiceService){ }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.searchQuery = params['query'] || ''
    })
  }

  performSearch(query:string):void{
     this.searchService.search(query).subscribe( data => {
      this.filteredData = data;
     })
  }

}
