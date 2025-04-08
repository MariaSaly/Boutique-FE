import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../../../environment';
import { HttpService } from '../../../service/httpService';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../../service/httpInterceptorService';
import { CommonModule } from '@angular/common';
import { HttpServiceWithHeaders } from '../../../service/httpServiceForAdmin';


@Component({
  selector: 'app-add-items',
  standalone: true,
  imports: [FormsModule, CommonModule],


  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit {
  formData: any = {};
  name: string = '';
  price: number = 0;
  files: any[] = []
  description: string = '';
  isCustomizable: string = 'false';
  isSleeve: string = 'false';
  isStitches: string = 'false';
  isStock: string = 'false'
  @ViewChild('submitBtn')
  submitButton!: ElementRef<HTMLButtonElement>;
  samepinch: boolean = false;
  colorPattern: string = '';
  category: string = '';
  isColor:string = 'false';
  isSize:string = 'false';
  stock: number = 0;
  image: File | null = null;
  isSubmitting = false;
  vedioUrl: string = '';
  private url = environment.localUrl;
  viewMode: boolean = false;
  itemId: any;
  showSubmitButton: boolean = false;
  items: unknown;
  selectedFiles: File[] = [];
  filenames: any[] = [];
  customizableCategories: any[] = ['momanddaughter', 'menswear', 'familycombo', 'cousinsquade', 'bridalsquade', 'bridalcostumes'];
  nonCustomizabeCategories: any[] = ['nine', 'coords', 'halfsaree', 'leggins', 'officewear', 'saree', 'plussize'];
  categoryList: any[] = this.nonCustomizabeCategories;
  subcategoryList: any[] = ['newarrivals', 'bestsellar']
  sizeOptions: string[] = ['S', 'M', 'L','XL','2XL','3XL','4XL','5XL','6XL','7XL','8XL','9XL','10XL']; // Example sizes
  selectedSizes: { [key: string]: boolean } = {};
  subcategory: string = '';
  offerprice: number = 0;
  constructor(private router: Router, private cdr: ChangeDetectorRef, private http: HttpServiceWithHeaders, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {

    if (this.router.url.endsWith('view')) {

      this.viewMode = true;

    }

    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("itemid:", this.itemId);
    this.activatedRoute.url.subscribe(urlSegments => {
      const urlPath = urlSegments.map(segment => segment.path).join('/');
      this.showSubmitButton = urlPath.endsWith('edit') || urlPath.endsWith('add');
    })
    if (this.itemId) {
      this.http.get(`${this.url}/api/items/getItemById/${this.itemId}`).subscribe(data => {
        console.log(" data:", data);
        const items: any = data;
        this.formData = data;
        this.name = items.name;
        this.price = items.price;
        this.offerprice= items.offerprice;
        this.description = items.description;
        this.isCustomizable = items.isCustomizable;
        this.samepinch = items.samepinch;
        this.category = items.category;
        this.stock = items.stock;
        this.image = items.image;
        this.vedioUrl = items.vedioLink;
        this.subcategory = items.subcategory;
        this.isColor=items.isColor;
        this.isSize= items.isSize;
        this.isSleeve=items.isSleeve;
        this.isStitches=items.isStitches;
        this.colorPattern = items.colorPattern
      })
    }
  }
  clearSubcategory() {
    this.subcategory = ''; // Set to empty string
  }
  onCustomizableChange() {
    console.log("iscustomizable:", this.isCustomizable);
    if (this.isCustomizable === 'true') {
      console.log("Entering true condition");
      this.categoryList = this.customizableCategories;
    } else {
      console.log("Entering false condition");
      this.categoryList = this.nonCustomizabeCategories;
    }
    console.log("categoryList after check:", this.categoryList);
    if (this.categoryList.length > 0) {
      this.category = this.categoryList[0];
      console.log("categorylist:", this.category);
    }

  }
  onSizeChange(size: string) {
    console.log('Selected Sizes:', this.selectedSizes);
  }
  onStockChange() {
    console.log("iscustomizable:", this.isCustomizable);
    if (this.isCustomizable === 'true') {
      console.log("Entering true condition");
      this.categoryList = this.customizableCategories;
    } else {
      console.log("Entering false condition");
      this.categoryList = this.nonCustomizabeCategories;
    }
    console.log("categoryList after check:", this.categoryList);

  }


  onsubmit(form: any) {
    console.log("Iam in onsubmit method");
    console.log("Form Validity:", form.valid);
    console.log("Form Data ID:", this.formData.id);
    if (form.valid) {
      this.submitButton.nativeElement.disabled = true;
      if (this.isSubmitting)
        return
      this.isSubmitting = true;
      if (this.formData.id) {
        console.log("Iam here to updatemethod:");
        this.updateItem();
      }
      else {
        this.createItem();
      }
    }
  }
  onFilesselected(event: any): void {
    console.log("I am in onFilesselected method:");
    const newFiles: File[] = Array.from(event.target.files); // Convert FileList to array

    // Append newly selected files to the existing array
    this.selectedFiles = [...this.selectedFiles, ...newFiles];

    console.log("Selected files after appending:", this.selectedFiles);
  }


  removefile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
  updateItem() {
    const formData = new FormData();
  
    const selectedSizesList = Object.keys(this.selectedSizes).filter(size => this.selectedSizes[size]);
    const sizesString = selectedSizesList.join(','); // Convert array to comma-separated string
  
    // Append form values directly from the component properties
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('offerprice', this.offerprice?.toString());
    formData.append('description', this.description.replace(/ /g, '\u00A0').replace(/\n/g, '\\n'));
    formData.append('isCustomizable', this.isCustomizable.toString());
    formData.append('category', this.category);
    formData.append('subcategory', this.subcategory);
    formData.append('stock', this.stock.toString());
    formData.append('isStock', this.isStock);
    formData.append('isColor', this.isColor);
    formData.append('isPattern', this.isSize);
    formData.append('isSleeve', this.isSleeve);
    formData.append('isStitches', this.isStitches);
    formData.append('vedioLink', this.vedioUrl);
    formData.append('sizes', sizesString); // Append sizes as comma-separated string
    formData.append('colorPattern', this.colorPattern ? this.colorPattern.split(',').map(c => c.trim()).join(',') : '');
  
    // Append image files
    for (const file of this.selectedFiles) {
      formData.append('imageUrl', file, file.name);
    }
  
    // Send data to server
    this.http.put<any>(`${this.url}/api/items/updateItem/${this.itemId}`, formData).subscribe({
      next: (response) => {
        console.log("Product updated successfully:", response);
        this.router.navigate(['/item']);
      },
      error: (error) => {
        console.log("Error in updating product:", error);
      },
    });
  }
  createItem() {
    const formData = new FormData();
  
    const selectedSizesList = Object.keys(this.selectedSizes).filter(size => this.selectedSizes[size]);
    const sizesString = selectedSizesList.join(','); // Convert array to comma-separated string
  
    // Append form values directly from the component properties
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('offerprice', this.offerprice.toString());
    formData.append('description', this.description.replace(/ /g, '\u00A0').replace(/\n/g, '\\n'));
    formData.append('isCustomizable', this.isCustomizable.toString());
    formData.append('category', this.category);
    formData.append('subcategory', this.subcategory);
    formData.append('stock', this.stock.toString());
    formData.append('isStock', this.isStock.toString());
    formData.append('isColor', this.isColor);
    formData.append('isPattern', this.isSize);
    formData.append('isSleeve', this.isSleeve.toString());
    formData.append('isStitches', this.isStitches.toString());
    formData.append('vedioLink', this.vedioUrl);
    formData.append('sizes', sizesString); // Append sizes as comma-separated string
    formData.append('colorPattern', this.colorPattern ? this.colorPattern.split(',').map(c => c.trim()).join(',') : '');
  
    // Append image files
    for (const file of this.selectedFiles) {
      formData.append('image', file);
    }
  
    // Send data to server
    this.http.post<any>(`${this.url}/api/items/createItem`, formData).subscribe({
      next: (response) => {
        console.log("Product created successfully:", response);
        this.router.navigate(['/item']);
      },
      error: (error) => {
        console.log("Error in creating product:", error);
      },
    });
  }


}
