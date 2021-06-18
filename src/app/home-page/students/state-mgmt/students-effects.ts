import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { StudentsService } from "../services/students-service";
import { StudentActions } from "./students-action-types";
import { AllStudentsLoaded } from "./students-actions";

@Injectable()
export class StudentsEffects{


    loadCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(StudentActions.loadStudents),
            concatMap(action => this.studentsHttpService.getStudents()
            ),
            map(students => AllStudentsLoaded({students}))
        )
    );

    saveCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(StudentActions.studentUpdated),
            concatMap(action => this.studentsHttpService.postStudents(
                String(action.update.changes.email),
                Boolean(action.update.changes.status)
            )),
        ),
        {dispatch:false}
    )
    
    constructor(
        private actions$:Actions,
        private studentsHttpService:StudentsService
    ){}

}