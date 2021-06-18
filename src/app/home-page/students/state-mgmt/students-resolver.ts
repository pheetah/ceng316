import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "src/app/reducers";
import { loadStudents } from "./students-actions";
import { areStudentsLoaded } from "./students-selectors";

//Resolve<StudentsInterface>
@Injectable()
export class StudentsResolver implements Resolve<any>{

    loading = false;

    constructor(private store:Store<AppState>){}

    resolve(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):Observable<any>{
        return this.store.pipe(
            select(areStudentsLoaded),
            tap(studentsLoaded => {
                if(!this.loading && !studentsLoaded){
                    this.loading = true;
                    this.store.dispatch(loadStudents());
                }
            }),
            filter(studentsLoaded => studentsLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }

}