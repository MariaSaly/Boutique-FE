import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-message',

  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.css'
})
export class PopupMessageComponent {
  @Input() title: string = ''; // Popup title
  @Input() message: string = ''; // Popup message
  @Output() closePopup = new EventEmitter<void>(); // Event to close the popup

  close() {
    this.closePopup.emit(); // Emit the event to notify the parent component
  }
}
