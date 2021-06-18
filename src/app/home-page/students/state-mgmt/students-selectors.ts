import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentsState } from "../../reducers";
import * as fromStudents from '../../reducers';


export const selectStudentsState = createFeatureSelector<StudentsState>("students");

export const selectAllStudents = createSelector(
    selectStudentsState,
    //state => state.id or state=> state.entity
    fromStudents.selectAll
);

export const selectAcceptedStudents = createSelector(
    selectAllStudents,
    //state => state.id or state=> state.entity
    students => students.filter(student => student.status == true || student.status == null)
);

// export const selectProposedStudents = createSelector(
//     selectAllStudents,
//     //state => state.id or state=> state.entity
//     students => students.filter(student => student.status == null)
// );

export const selectProposedorRejectedStudents = createSelector(
    selectAllStudents,
    //state => state.id or state=> state.entity
    students => students.filter(student => student.status === null || student.status == false)
);

export const areStudentsLoaded = createSelector(
    selectStudentsState,
    state => state.allStudentsLoaded
);