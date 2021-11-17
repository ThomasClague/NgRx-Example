import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.sass']
})
export class NavContainerComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  constructor(
    // private store$: Store<LoginStoreState.State>,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = of(false);
    // this.isLoggedIn$ = this.store$.select(
    //   LoginStoreSelectors.selectIsUserLoggedIn
    // );
  }
  
  logout() {
    // this.store$.dispatch(
    //     new LoginStoreActions.LogoutAction()
    // );
    this.isLoggedIn$ = of(false);
  }

  login() {
    // this.store$.dispatch(
    //     new LoginStoreActions.LoginAction()
    // );
    this.isLoggedIn$ = of(true);
  }
}
