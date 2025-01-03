import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessageComponent } from '../pages/popupmessage/popup-message/popup-message.component';



@NgModule({
  declarations: [PopupMessageComponent],
  exports:[
    PopupMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
