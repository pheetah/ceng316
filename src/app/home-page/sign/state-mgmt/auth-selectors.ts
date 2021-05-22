import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../../reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const LoginSelector = createSelector(
    //(state:any) => state["auth"],
    selectAuthState,
    (auth) => !!auth.token
);

export const LogoutSelector = createSelector(
    LoginSelector,
    loggedIn => !loggedIn
);