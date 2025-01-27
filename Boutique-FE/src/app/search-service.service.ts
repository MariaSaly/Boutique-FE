import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../service/httpService';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  public url = environment.localUrl;

  constructor(private http: HttpService) { }

  search(query: string): Observable<any[]> {
    console.log("query:", query);
    
    // Ensure you're passing the query parameter to the API endpoint
    return this.http.get<any[]>(`${this.url}/api/items/searchItems?query=${query}`);
  }
}
