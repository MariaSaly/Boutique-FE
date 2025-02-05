import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/httpService';
import { environment } from '../../environment';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpServiceWithHeaders } from '../../service/httpServiceForAdmin';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-order-listing',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './order-listing.component.html',
  styleUrl: './order-listing.component.css'
})
export class OrderListingComponent implements OnInit {
  private url = environment.localUrl
  ordersWithDates: any;
 constructor( private http:HttpServiceWithHeaders , private router:Router , private httpClient:HttpService){
   
 }
  ngOnInit(): void {
   this.getOrderDetails();
   
  }

  getOrderDetails(){
    this.http.get<any>(`${this.url}/api/orders/getAllOrders`).subscribe(data => {
      console.log("data:", data);
    
      // Map through the orders and convert each Firestore timestamp
      this.ordersWithDates = data.orders.map((item: { Date: any; }) => {
        const firestoreDate = item.Date; // Get the Firestore date
        const jsDate = new Date(firestoreDate._seconds * 1000); // Convert to JavaScript Date
        return {
          ...item, // Keep other fields
          jsDate, // Add the converted JavaScript date
        };
      });
      this.generateInvoice();
    
      console.log("ordersWithDates:", this.ordersWithDates);
    });
    
    
  }
  getDate(date:any):Date{
    return new Date(date._seconds*1000);
  }
  getUserData(email:string):Promise<any>{
   return this.httpClient.get<any>(`${this.url}/api/users/getUserById?email=${email}`).toPromise()
  }
  getItemData(userId:string):Promise<any>{
    return this.httpClient.get<any>(`${this.url}/api/items/getItemById/${userId}`).toPromise()
  }
  async generateInvoice() {
    const filteredOrder = this.ordersWithDates.filter((item: any) => item.status === 'paid');
    let generateObjects: any = [];

    // Async operation for each order
    for (const order of filteredOrder) {
      let orderObject = {
        orderedAt: this.getDate(order.Date),
        orderId: order.id,
        orderStatus: order.status,
        orderDelivery: order.deliveryAddress
      };

      let userData = await this.getUserData(order.email);
      let userObject = {
        name: userData[0]?.name,
        phonenumber: userData[0]?.phonenumber
      };

      // Fetch and map items for each order
      for (const cartItems of order.cartItems) {
        for (const item of cartItems.items) {
          let itemData = await this.getItemData(item.productId);
          let itemObject = {
            quantity: item.quantity,
            itemName: itemData.name,
            itemPrice: itemData.price
          };

          let generateObject = {
            order: orderObject,
            user: userObject,
            item: itemObject
          };

          generateObjects.push(generateObject);
        }
      }
    }
    this.printOrders(generateObjects);
  }

  async printOrders(order: any) {
    const doc = new jsPDF({
        orientation: 'landscape',  // Keep it landscape
        unit: 'mm',
        format: [130, 90] // Keep width (130mm), height (90mm)
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12); // Adjust size if needed

    // Function to add each order content with a delay between them
    const printOrder = async (item: any, index: number) => {
        const content = this.generateTemplate(item);
        let yPosition = 10; // Start position

        content.forEach((line: string) => {
            doc.text(line, 10, yPosition);
            yPosition += 5; // Adjust line spacing if needed
        });

        // If it's not the last order, add a new page
        if (index !== order.length - 1) {
            doc.addPage([130, 90]); // Keep width, height as is
        }

        // Simulate delay between printing each order
        await this.delay(1000); // Delay in milliseconds (1 second)
    };

    // Process orders one by one with a delay
    for (let i = 0; i < order.length; i++) {
        await printOrder(order[i], i);
    }

    // After all orders have been printed, open the PDF in a new tab
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
}

// Helper function to add a delay
delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}











// Generate the HTML template for each order
generateTemplate(order: any): string[] {
  return [
      `Mokshe Destination`,
      `Address: 1234 Business St, City`,
      `Phone: 555-555-5555 | Email: contact@business.com`,
      `---------------------------------------------------`,
      `Order ID: ${order.order.orderId || '-'}`,
      `Item Name: ${order.item.itemName || '-'}`,
      `Price: $${order.item.itemPrice || '-'}`,
      `Status: ${order.order.orderStatus || '-'}`,
      `Quantity: ${order.item.quantity || '-'}`,
      `---------------------------------------------------`,
      `Customer Details:`,
      `Name: ${order.user.name || '-'}`,
      `Phone: ${order.user.phonenumber || '-'}`,
      `Address: ${order.order.orderDelivery.addressLine1}-${order.order.orderDelivery.addressLine2}-${order.order.orderDelivery.city}-${order.order.orderDelivery.postalCode}-${order.order.orderDelivery.country || '-'}`,
      `---------------------------------------------------`
  ];
}



 

  viewOrder(id:string){
    this.router.navigate([`/order/${id}`])
  }
  confirmDelete(id:string){
    const confirmDelete = window.confirm(`Are you sure you want to delete order:${id}`);
    if(confirmDelete){
      this.deleteOrder(id)
    }
    else{
      alert("order deleted request is rewind !");
    }
  }
   deleteOrder(id:string){
    this.http.delete<any>(`${this.url}/api/orders/deleteOrder/${id}`).subscribe(()=>{
         alert(`order-${id} deleted sucessfully`);
         this.getOrderDetails();
    })
   }
}
