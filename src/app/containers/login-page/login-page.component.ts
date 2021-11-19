import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/_interfaces/requests/auth/login-request';
import {
	UserStoreActions,
	UserStoreSelectors,
	UserStoreState,
} from 'src/app/_store';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.sass'],
})
export class LoginPageComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private store$: Store<UserStoreState.State>
	) {}

	loginForm: FormGroup;
	isLoading$: Observable<boolean>;
	error$: Observable<string>;

	ngOnInit(): void {
		this.buildForm();

		this.isLoading$ = this.store$.select(UserStoreSelectors.isLoading);
		this.error$ = this.store$.select(UserStoreSelectors.error);

		this.isLoading$.subscribe(res => {
			console.log('this.isLoading$', res);
		})

	}

	private buildForm() {
		this.loginForm = this.fb.group({
			username: [, [Validators.required, Validators.maxLength(30)]],
			password: [, [Validators.required, Validators.maxLength(30)]],
		});
	}

	getValues() {
		let username = this.loginForm.get('username').value;
		let password = this.loginForm.get('password').value;

		console.log('username and password', username, password);
		this.login(username, password);
	}

	login(username: string, password: string) {
		this.store$.dispatch(
			UserStoreActions.login({
				payload: { username, password } as LoginRequest,
			})
		);
	}
}
