import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // Mark this as standalone
   imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.checkTokenExpiry()
  }
  @HostListener('window:beforeunload',['$event'] )
  clearStorage(event:Event){
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }
  checkTokenExpiry(){
    const token = localStorage.getItem("token");
    if(token){
      try{
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        if(currentTime>expiryTime){
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        }
      }
      catch(err){
        console.error("Error decoding token:", err);
        localStorage.removeItem('token'); // If invalid token, remove it
        localStorage.removeItem('userData');
      }
    }
  }
}