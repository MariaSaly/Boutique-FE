import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-items',
  standalone:true,
  imports: [],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent {
  constructor(private router:Router){}
  onsubmit(){
    this.router.navigate(['/list'])
  }
}
