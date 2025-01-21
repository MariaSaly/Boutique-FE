import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../service/homesharedservice';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private route:Router,private sharedService: SharedService){}
  selectedContent: { title: string, description: string } | null = null;

  showCategoryContent: boolean = false; // For "Customize" button in mokshe
  showCategoryContent1: boolean = false; // For "Explore" button in samepinch
  
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
  cutomize(){
    this.sharedService.setCategoryContentFlag(true);
    this.sharedService.setSamePinchFlag(false); // Ensure this is reset
    this.route.navigate(['/home'])
  }
  samepinch(){
    this.sharedService.setSamePinchFlag(true);
    this.sharedService.setCategoryContentFlag(false); 
    this.route.navigate(['/home'])
  }
}
