import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  changePassword: any;
    private apiUrl=`${environment.localUrl}`

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const storedToken = localStorage.getItem('token');
    console.log("storedtoken:", storedToken);
    
    // Check if the token exists before parsing
    if (storedToken) {
      const authToken = storedToken;
      console.log("authToken:", authToken);
  
      if (!authToken) {
        console.error('Token field is missing in the parsed authToken');
        return new HttpHeaders();
      }
  
      return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    } else {
      console.error('No authToken found in localStorage');
      return new HttpHeaders();
    }
  }
  post<T>(url: string, body: any): Observable<any> {
    console.log("url:",url);
    return this.http.post(url, body, { headers: this.getHeaders() });
  }
  postRole<T>(url: string, body: any): Observable<any> {
    console.log("url:",url);
    return this.http.post(url, body, { headers: this.getHeaders() });
  }
  patch<T>(url: string, body: any): Observable<any> {
    return this.http.patch(url, body, { headers: this.getHeaders() });
  }
  

  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { headers: this.getHeaders() });
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.getHeaders() });
  }

  getById<T>(url: string, id: string | number, params?: any): Observable<T> {
    // Construct URL with ID. It assumes your URL does not end with a slash.
    const fullUrl = `${url}/${id}`;
    return this.http.get<T>(fullUrl, { headers: this.getHeaders(), params: {params} });
  }
  // Updated method to fetch points data for a specific unit
  getPointsDataForUnit(accountId: string): Observable<any[]> {
    // Construct the URL with the unitName parameter
    const url = environment.localUrl+'/accounts/' + accountId.toString() + '/data'


    // Make an HTTP request to fetch points data for the specified unit
    return this.http.get<any[]>(url);
  }

  // Add more methods as needed (e.g., get, put, delete)
}