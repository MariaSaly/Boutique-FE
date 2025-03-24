import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollCommunicationService {
  private newArrivalsClicked = new Subject<void>();
  private bestSellersClicked = new Subject<void>(); // ✅ Added for Best Sellers

  newArrivalsClicked$ = this.newArrivalsClicked.asObservable();
  bestSellersClicked$ = this.bestSellersClicked.asObservable(); // ✅ Observable for Best Sellers

  notifyNewArrivalsClick() {
    console.log("🚀 Notifying subscribers: New Arrivals Clicked!");
    this.newArrivalsClicked.next();
  }

  notifyBestSellersClick() { // ✅ Function for Best Sellers
    console.log("🔥 Notifying subscribers: Best Sellers Clicked!");
    this.bestSellersClicked.next();
  }
}
