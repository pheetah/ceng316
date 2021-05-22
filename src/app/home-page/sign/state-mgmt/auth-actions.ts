import { createAction, props } from "@ngrx/store";

export const login = createAction(
    "[Login Page] User Login",
    props<{token:string}>()
);

export const logout = createAction(
    "[Main Menu] User Logout"
);