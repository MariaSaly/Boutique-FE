import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToSection = new Subject<string>();
  scrollToSection$ = this.scrollToSection.asObservable();

  triggerScroll(section: string) {
    console.log('📡 ScrollService: Emitting event to scroll to', section);
    this.scrollToSection.next(section);
  }
}
