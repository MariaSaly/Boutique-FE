import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class SharedService{
    private refreshCartSource = new Subject<void>();
    refreshCart$ = this.refreshCartSource.asObservable();

    triggerRefreshCart(){
        this.refreshCartSource.next();
    }
}