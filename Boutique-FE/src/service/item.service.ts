import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string[]; // Assuming imageUrl is an array of strings
    isCustomizable: boolean;
    stock: number;
  }
  
export class ItemService {
  private baseUrl = 'http://your-backend-url/api/items'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
