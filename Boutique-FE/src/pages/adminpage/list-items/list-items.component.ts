import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-items',
  imports: [CommonModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
constructor(private router:Router){}
add(){
  this.router.navigate(['/add'])
}
items: any[] = []; // Array to store submitted items

// Example of adding an item when the form is submitted
addItem(item: { imageUrl: string; description: string; isCustomizable: boolean }) {
  this.items.push(item);
}
}
