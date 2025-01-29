import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor() { }

  search(query:string):Observable<any[]>{
      console.log("query:",query);
      const result:any = [];
      return result
  }
}
