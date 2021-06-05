import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class CurrentProgress{
    public currentProgress$:BehaviorSubject<string> = new BehaviorSubject('Education Plan');
}