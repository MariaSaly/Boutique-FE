import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { AuthService } from "../shared/authService";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor( private authService:AuthService){
  


    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token');
      if(token){
          const tokenParsed = JSON.parse(token);
         const cloned = req.clone({
            headers:req.headers.set('Authorization',`Bearer ${tokenParsed}`)
         });
         return next.handle(cloned).pipe(
            catchError((error) => {
                if(error.status === 410  ||  error.status === 403){
                    this.authService.makeApiCall().then((newToken: any) => {
                        const clonedRetry = req.clone({
                            headers:req.headers.set('Authorization',`Bearer ${newToken}`)
                        });
                        return next.handle(clonedRetry);
                    })
                }
                throw error;
            })
         )
      }
      return next.handle(req);
    }

}
   