import { HttpSentEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpServiceWithHeaders } from '../../service/httpServiceForAdmin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  public url = environment.localUrl;
  orders: any;
  jsDate!: Date;
  trackingId: string = ''
  deliveryAddress: string = '';
  userData: any;
  itemsData: any;
  paymentDate!: Date;
  isEditing: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpServiceWithHeaders, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id:", id);
    this.http.get<any>(`${this.url}/api/orders/orderById/${id}`).subscribe(data => {
      console.log("data:", data);
      const date = data.orders.Date;
      this.orders = data.orders;
      this.jsDate = new Date(date._seconds * 1000);
      console.log("jsdate:", this.jsDate);
      const deliveryAddressObject = data.orders.deliveryAddress;
      this.deliveryAddress = `${deliveryAddressObject.addressLine1},${deliveryAddressObject.addressLine2},${deliveryAddressObject.city},${deliveryAddressObject.country},${deliveryAddressObject.postalCode}`;
      console.log("deliveraddress:", this.deliveryAddress);
      this.getUserById(data.orders.email);
      this.getCartItems(data.orders);
      this.paymentDate = new Date(data.orders.paymentVerifiedAt._seconds * 1000);
      console.log("paymentdate:", this.paymentDate);

    })
  }
  getUserById(email: string) {
    this.http.get<any>(`${this.url}/api/users/getUserById?email=${email}`).subscribe(data => {
      console.log("userData:", data);
      this.userData = data;
    })
  }
  async getItemById(id: string) {
    const response = await this.http.get<any>(`${this.url}/api/items/getItemById/${id}`).toPromise();
    return response
  }

  async getCartItems(order: any) {
    console.log("order:", order);

    // Extract cartItems and get the items array
    const cartItems = order.cartItems.map((data: { items: any; }) => data.items);
    const allItemsArray = [];

    // Loop through each cartItems array
    for (const items of cartItems) {
      console.log("items:", items);

      // Loop through each item inside cartItems
      for (const item of items) {
        console.log("item:", item);

        // Fetch the item data using productId
        const itemData = await this.getItemById(item.productId);

        // Combine the item data with its quantity
        const fullItemData = {
          ...itemData,          // The fetched item data
          quantity: item.quantity,
          size: item.size // Add the quantity from the cart item
        };

        console.log("fullItemData:", fullItemData);
        allItemsArray.push(fullItemData); // Push the combined data to the array
        console.log("allitemsarray:", allItemsArray);
      }
    }
    this.itemsData = allItemsArray;
    // Return the final array with all the item data and quantity
    return allItemsArray;
  }

  editStatus() {
    this.isEditing = true;
  }

  saveStatus(id: string) {
    const status = { status: this.orders.status };
    console.log('Updated status:', status);

    this.http.patch<any>(`${this.url}/api/orders/${id}`, status).subscribe(() => {
      this.isEditing = false;
    });
  }
  updateTrackingId(id: string) {
    if (!this.trackingId) {
      alert('Please enter a valid Tracking ID.');
      return;
    }
    const trackingId = this.trackingId;
    console.log("trackingId:", trackingId);
    this.http.patch<any>(`${this.url}/api/orders/updateTrackingId/${id}`, {trackingId:trackingId}).subscribe(data => {
      if (data) {
        this.toastrService.success("TrackingId Updated Successfully")
      }

    })
  }
}
