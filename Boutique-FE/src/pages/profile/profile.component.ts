import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppModule } from '../../app/app.module';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public url = environment.localUrl;
  productImagesCache: { [key: string]: string } = {}; // Cache for product images
  productCache: { [key: string]: any } = {}; // Store product details
  orders: any[] = [];
  price: any;
  productImageLoading: any;
  loadingImages: any;
  productImages: any;
  userId: any;
  userData: any;
  user: any = null;
  constructor(private http: HttpService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.getUserData()
    this.getOrders()
  


  }
  getUserData() {
    const data:any = localStorage.getItem('userData');
    if (data) {
      const userData = JSON.parse(data);
      console.log("usedata:", userData)
      const email = userData.email
      console.log("email")
      this.http.get<any>(`${this.url}/api/users/getUserById?email=${email}`).subscribe(data => {
        console.log("userdata:", data);
        this.user = data;
        this.cdr.detectChanges()
      }

      )
    }

  }
  getOrders() {
    const data: any = localStorage.getItem('userData');
    if (data) {
      const user = JSON.parse(data);

      const userId = user.user_id;

      this.http.get<any>(`${this.url}/api/orders/orderByUserId/${userId}`).subscribe(response => {
        this.orders = response.orders;
        this.fetchAllProducts(); // Fetch product details after orders are loaded
      });
    } else {
      console.log("No user is logged in");
    }
  }

  fetchAllProducts() {
    const productIds = new Set<string>();

    // Extract unique product IDs from all orders
    this.orders.forEach(order => {
      order.cartItems.forEach((cartItem: { items: any[]; }) => {
        cartItem.items.forEach(item => {
          if (!this.productCache[item.productId]) {
            productIds.add(item.productId);
          }
        });
      });
    });

    // Fetch product details for all unique product IDs
    productIds.forEach(productId => {
      this.http.get<any>(`${this.url}/api/items/getItemById/${productId}`).subscribe(data => {
        this.productCache[productId] = data;
        this.cdr.detectChanges()
      });
    });
  }

  // Function to get product image
  getProductImage(productId: string): string {
    console.log("prodyctcache:", this.productCache[productId]);

    return this.url + this.productCache[productId]?.imageUrl || 'default-image.jpg';
  }

  // Function to get product price
  getProductPrice(productId: string): number {
    return this.productCache[productId]?.price || 0;
  }




  convertToDate(date: any): Date {
    const seconds = date._seconds;
    const nanoseconds = date._nanoseconds;
    // Create a new Date object with the seconds part of the timestamp
    return new Date(seconds * 1000); // Convert seconds to milliseconds
  }

  getOrder() {
    const data: any = localStorage.getItem('userData');
    if (data) {
      const user = JSON.parse(data);
      const userId = user.user_id;
      this.http.get<any>(`${this.url}/api/orders/orderByUserId/${userId}`).subscribe(data => {
        console.log("data:", data);
        this.orders = data.orders;
      })

    }
    else {
      console.log("no user is logged in ")
    }
  }

  getItemData(productId: string) {

  }
}
