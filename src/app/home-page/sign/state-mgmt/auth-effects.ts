import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";
import jwt_decode from "jwt-decode";
import { AuthService } from "../services/login.service";

@Injectable()
export class AuthEffects{

    //version 1
    // constructor(actions$: Actions){
    //     actions$.subscribe((action:any) =>{
    //         if(action.type == "[Login Page] User Login"){
    //             localStorage.setItem("token", action["token"]);
    //         }
    //     });
    // }


    //version2
    // constructor(private actions$: Actions){

    //     const login$ = this.actions$.pipe(
    //         // filter(action.type == "xxx")
    //         ofType(AuthActions.login),
    //         tap(action => { 
    //             localStorage.setItem("token", action.token);
    //         })
    //     );

    //     login$.subscribe();

    // }


    //version3
    login$ = createEffect(() =>         
        this.actions$.pipe(
            // filter(action.type == "xxx")
            ofType(AuthActions.login),
            tap(action => { 
                localStorage.setItem("token", action.token);
                this.authService.loginType$.next(jwt_decode<any>(action.token).user_type);
            })
        ),
        {dispatch: false}
    );

    logout$ = createEffect(() =>         
    this.actions$.pipe(
        // filter(action.type == "xxx")
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