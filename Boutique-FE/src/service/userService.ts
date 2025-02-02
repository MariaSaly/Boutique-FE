import { Injectable } from "@angular/core";
import { HttpService } from "./httpService";
import { environment } from "../environment";
import { Observable } from "rxjs";
import { HttpServiceWithHeaders } from "./httpServiceForAdmin";

@Injectable({
    providedIn: 'root'
})


export class userService{
    private url = environment.localUrl
    constructor( private http:HttpServiceWithHeaders){

    }

    createUser(userData:any):Observable<any>{
      return this.http.post(`${this.url}/api/users/create-user`,userData)
    }

    getAllUser():Observable<any>{
        return this.http.get(`${this.url}/api/users/getAllUsers`)
    }
}