import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{ HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { environment } from '../../../environment'; 
import { HttpService } from '../../../service/httpService';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../service/httpInterceptorService';


@Component({
  selector: 'app-add-items',
  standalone:true,
  imports: [FormsModule ],
  
  
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit {
  formData: any = {};
  name: string = '';
  price: number = 0;
  description: string = '';
  isCustomizable: boolean = false;
  @ViewChild('submitBtn')
  submitButton!: ElementRef<HTMLButtonElement>;
  samepinch: boolean = false;
  category: string = '';
  stock: number = 0;
  image: File | null = null;
  isSubmitting = false;
  private url = environment.localUrl;
  viewMode: boolean = false;
  itemId: any;
  showSubmitButton: boolean = false;
  items: unknown;
  constructor(private router:Router ,private http:HttpService,private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    if(this.router.url.endsWith('view')){
      this.viewMode = true;
    }
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("itemid:", this.itemId);
    this.activatedRoute.url.subscribe( urlSegments => {
      const urlPath = urlSegments.map(segment => segment.path).join('/');
      this.showSubmitButton = urlPath.endsWith('edit') || urlPath.endsWith('add');
    })
    if(this.itemId){
      this.http.get(`${this.url}/api/items/getItemById/${this.itemId}`).subscribe( data => {
        console.log(" data:", data);
        const items:any = data;
        this.formData = data;
        this.name = items.name;
        this.price = items.price;
        this.description = items.description;
        this.isCustomizable = items.isCustomizable;
        this.samepinch = items.samepinch;
        this.category = items.category;
        this.stock = items.stock;
        this.image = items.image;
      })
    }
  }

  onsubmit(form:any){
    if(form.valid){
      this.submitButton.nativeElement.disabled = true; 
      if(this.isSubmitting)
        return
      this.isSubmitting = true;
      if(this.formData.id){

      }
      else{
        this.createItem();
      }
    }
  }
  createItem() {
    console.log("Iam in onsubmit method");
  
    //console.log("Form validity:", form.valid); // Log form validity
    
      const formData = new FormData();
      console.log("Iam in onsubmit function, form is valid.");
  
      // Append form values directly from the component properties
      formData.append('name', this.name);
      console.log("Name added to formData:", this.name);
      formData.append('price', this.price.toString()); // Ensure it's a string
      formData.append('description', this.description);
      formData.append('isCustomizable', this.isCustomizable.toString()); // Ensure it's a string
      formData.append('category', this.category);
      formData.append('stock', this.stock.toString()); // Ensure it's a string
  
      // Append image file
      const imageFile = (document.getElementById('imageUpload') as HTMLInputElement).files?.[0];
      console.log("Image file:", imageFile);
      if (imageFile) {
        formData.append('image', imageFile);
      }
  
      // Send data to server
      console.log("Sending data to server:", formData);
      this.http.post<any>(`${this.url}/api/items/createItem`, formData).subscribe({
        next: (response) => {
          console.log("Product created successfully:", response);
          this.router.navigate(['/admin/list']);
        },
        error: (error) => {
          console.log("Error in creating product:", error);
        },
      });
    
  }
  
  
}
