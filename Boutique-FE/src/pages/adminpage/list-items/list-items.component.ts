import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpService } from '../../../service/httpService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-items',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent implements OnInit {
  public url = environment.localUrl;
constructor(private router:Router, private http:HttpService,private cdr: ChangeDetectorRef,private httpclient:HttpClient){}
  ngOnInit(): void {
    this.getItem();
  }
  getItem(){
   this.http.get<any>(`${this.url}/api/items/getItem`).subscribe({
    next:(response)=>{
      console.log("data:", response);
      this.items = response;
      // this.items.forEach((items)=>{
      //   this.fetchImageForItems(items);
      // })
    },
    error:(error)=>{
      console.log(`Error in getting the Data:${error}`);
    }
   })
  }
  fetchImageForItems(Item: any): void {
    
    let imagePath = Item.imageUrl;

    // Ensure no duplicate slashes in the URL
    const normalizedUrl = `${this.url.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`;
    
    console.log("Fetching image from:", normalizedUrl);
    
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
  confirmDelete( item:any){
    const confirmDelete = window.confirm("Are you sure you want to Delete!");
    if(confirmDelete){
      this.deleteItem(item.id);
    }
  }
deleteItem(itemId:any){
this.http.delete(`${this.url}/api/items/deleteItem/${itemId}`).subscribe( response => {
  if(response){
    alert(`${itemId} deleted sucessfully`);
    this.getItem();
  }
})
}
  onCardClick(id: string, action: 'view' | 'edit'): void {
    const route = action === 'view' ? `item/${id}/view` : `item/${id}/edit`;
    this.router.navigate([route]);
  }
  
  

add(){
  this.router.navigate(['/item/add'])
}
items: any[] = []; // Array to store submitted items

// Example of adding an item when the form is submitted
addItem(item: { imageUrl: string; description: string; isCustomizable: boolean }) {
  this.items.push(item);
}
}
