import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginRequest } from 'src/app/_interfaces/requests/auth/login-request';
import { UserStoreActions, UserStoreState, UserStoreSelectors } from '../../_store/user-store';


@Component({
  selector: 'app-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.sass']
})
export class NavContainerComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private store$: Store<UserStoreState.State>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store$.select(
      UserStoreSelectors.isLoggedIn
    );
  }

  login() {
    this.store$.dispatch(
        UserStoreActions.login({ payload: { username: 'Thomas.Clague', password: 'P4ssword1,' } as LoginRequest})
    );
  }
  
  logout() {
    this.store$.dispatch(UserStoreActions.logout());
  }


}
