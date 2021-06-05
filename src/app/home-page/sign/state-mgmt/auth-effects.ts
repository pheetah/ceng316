import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";
import jwt_decode from "jwt-decode";
import { AuthService } from "../services/login.service";

@Injectable()
export class AuthEffects{

    login$ = createEffect(() =>         
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => { 
                localStorage.setItem("token", action.token);
                this.authService.loginType$.next(jwt_decode<any>(action.token).user_type);
                if(jwt_decode<any>(action.token).user_type == "student"){
                    this.router.navigate(['dashboard']);
                }else if(jwt_decode<any>(action.token).user_type == "advisor"){
                    this.router.navigate(['dashboard-advisors']);
                }
            })
        ),
        {dispatch: false}
    );

    logout$ = createEffect(() =>         
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => { 
                localStorage.removeItem("token");
                this.router.navigate(['sign']);
            })
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions,
                private router:Router,
                private authService:AuthService,
    ){}

}