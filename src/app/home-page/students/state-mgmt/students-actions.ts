import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IStudents, IStudentsList } from "../hpholder.component";


export const loadStudents = createAction(
    "[Students Resolver] Load All Students"
);

export const AllStudentsLoaded = createAction(
    "[Load Students Effect] All Students Loaded",
    props<{students:IStudentsList}>()
);

export const studentUpdated = createAction(
    "[Edit Students Dialog] Student Updated",
    props<{update:Update<IStudents>}>()
);