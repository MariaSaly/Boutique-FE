import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class customizationTextService{
    constructor(){

    }
    private customizationTextSource = new BehaviorSubject<string>('');
    currentCustomText$ = this.customizationTextSource.asObservable();

    updateCustomText(customtext:string){
        this.customizationTextSource.next(customtext);
    }
}