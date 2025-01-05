import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private route:Router,){}
  selectedContent: { title: string, description: string } | null = null;
  leftContent = {
    title: 'Customizable Material',
    description: 'This content explains how you can customize the material to suit your needs.'
  };

  rightContent = {
    title: 'Non-Customizable Material',
    description: 'This content explains that the material cannot be customized.'
  };

  onImageClick(imageType: string): void {
    if (imageType === 'customize') {
      // You can trigger any action or update content here if needed
      alert('Customizable content clicked');
    } else if (imageType === 'non-customize') {
      // Handle non-customizable content click
      alert('Non-Customizable content clicked');
    }
  }
  custom(){
    this.route.navigate(['/home'])
  }
}
