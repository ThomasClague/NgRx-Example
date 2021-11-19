import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterRequest } from 'src/app/_interfaces/requests/auth/register-request';
import {
	UserStoreActions,
	UserStoreSelectors,
	UserStoreState,
} from 'src/app/_store';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.sass'],
})
export class RegisterPageComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private store$: Store<UserStoreState.State>
	) {}

	registerForm: FormGroup;
	isLoading$: Observable<boolean>;
	error$: Observable<string>;

	ngOnInit(): void {
		this.buildForm();

		this.isLoading$ = this.store$.select(UserStoreSelectors.isLoading);
		this.error$ = this.store$.select(UserStoreSelectors.error);
	}

	private buildForm() {
		this.registerForm = this.fb.group({
			username: [, [Validators.required, Validators.maxLength(30)]],
			password: [, [Validators.required, Validators.maxLength(30)]],
			firstname: [, [Validators.required, Validators.maxLength(30)]],
			lastname: [, [Validators.required, Validators.maxLength(30)]],
		});
	}

	getValues() {
		let registerRequest : RegisterRequest = {
			username: this.registerForm.get('username').value,
			password: this.registerForm.get('password').value,
			firstname: this.registerForm.get('firstname').value,
			lastname: this.registerForm.get('lastname').value,
		}
		this.register(registerRequest);
	}

	register(register: RegisterRequest) {
		this.store$.dispatch(
			UserStoreActions.register({
				payload: register,
			})
		);
	}
}
