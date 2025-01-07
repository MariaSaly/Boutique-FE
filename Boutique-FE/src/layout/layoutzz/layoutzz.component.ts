import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layoutzz',
  imports: [HeaderComponent, FooterComponent, RouterModule],
  standalone:true,
  templateUrl: './layoutzz.component.html',
  styleUrl: './layoutzz.component.css'
})

export class LayoutzzComponent {

}
