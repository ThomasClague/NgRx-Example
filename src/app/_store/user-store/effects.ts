import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import { LoginRequest } from "src/app/_interfaces/requests/auth/login-request";
import { LoginResponse } from "src/app/_interfaces/responses/auth/login-response";
import { User } from "src/app/_interfaces/user/user";
import { AuthService } from "src/app/_services/auth.service";
import { login, loginSuccess, loginError} from "./actions";

@Injectable()
export class UserEffects {
    
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}
      
    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(login),
            map(action => action.payload),
            switchMap((payload) => this.authService.login(payload).pipe(
                map((loginResponse: LoginResponse) => loginSuccess({ payload: loginResponse as User})),
                catchError(error => of(loginError(error)))
            ))
        )
    );
}
