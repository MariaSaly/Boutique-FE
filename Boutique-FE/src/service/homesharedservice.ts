import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Flags for which content to show
  private categoryContentFlag = new BehaviorSubject<boolean>(false); // Default: false
  private samePinchFlag = new BehaviorSubject<boolean>(false); // Default: false

  // Observables for components to subscribe to
  categoryContent$ = this.categoryContentFlag.asObservable();
  samePinchContent$ = this.samePinchFlag.asObservable();

  // Methods to update flags
  setCategoryContentFlag(value: boolean) {
    this.categoryContentFlag.next(value);
  }

  setSamePinchFlag(value: boolean) {
    this.samePinchFlag.next(value);
  }
}
