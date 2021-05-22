import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { LoginSelector } from '../state-mgmt/auth-selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(LoginSelector),
      tap(loggedIn => {
        if(!loggedIn){
          this.router.navigate(['sign']);
        }
      })
    )
  }
  
}