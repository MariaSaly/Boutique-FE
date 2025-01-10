import { Injectable } from "@angular/core";
import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";

@Injectable({
    providedIn:'root'
})


export class SearchService {
    private searchQuerySubject = new BehaviorSubject<string>('');
    searchQuery$ = this.searchQuerySubject.asObservable();

    updateSearchQuery( query:string):void{
        console.log("queryinservice:",query);
        this.searchQuerySubject.next(query);
    }
    constructor() {
        // Optional: Implement debounce here if required
        this.searchQuery$ = this.searchQuery$.pipe(
          debounceTime(300), // Wait for 300ms after typing stops
          distinctUntilChanged() // Only trigger if the query actually changes
        );
      }
}