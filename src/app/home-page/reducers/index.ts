import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../sign/state-mgmt/action-types';
import { IStudents, IStudentsList } from '../students/hpholder.component';
import { StudentActions } from '../students/state-mgmt/students-action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  token:string | undefined
}

export const initialAuthState:AuthState = {
  token:undefined
};

// function authReducer(state:AuthState, action:any):AuthState{

// }

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) =>{
    return {
      token: action.token
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      token: undefined
    }
  })
);

// export interface StudentsState{
//   //students:IStudentsList[]
//   entities: {[key:number]:IStudentsList}
// }

export interface StudentsState extends EntityState<IStudents>{
  allStudentsLoaded: boolean
}

export const adapter = createEntityAdapter<IStudents>({
  selectId: (student: IStudents) => student.email
  //sortComparer 
});

export const initialStudentsState = adapter.getInitialState({
  allStudentsLoaded: false
});

export const studentsReducer = createReducer(
  initialStudentsState,
  on(StudentActions.AllStudentsLoaded, (state,action) => adapter.addMany(action.students.proposes, {...state, allStudentsLoaded:true})),
  on(StudentActions.AllStudentsLoaded, (state,action) => adapter.addMany(action.students.accepted, {...state, allStudentsLoaded:true})),
  on(StudentActions.studentUpdated, (state, action) => adapter.updateOne(action.update, state))
);

export const {selectAll} = adapter.getSelectors();