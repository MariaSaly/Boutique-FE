import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-addresss-model',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './delivery-addresss-model.component.html',
  styleUrl: './delivery-addresss-model.component.css'
})
export class DeliveryAddresssModelComponent {
  deliveryAddress = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: ''
  };
  constructor(public dialogRef:MatDialogRef<DeliveryAddresssModelComponent>){
    
  }
  submitAddress(){
    // Here you can send the address to your backend or handle it as needed
    console.log('Address submitted:', this.deliveryAddress);
    // Close the dialog after submitting the address
    this.dialogRef.close(this.deliveryAddress);
  }
}
