import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/_shared/base/form-base/form-base.component';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent extends FormBase implements OnInit {
	@Input() loginForm: FormGroup;
	@Input() loading: boolean;
	@Input() error: string;
	@Output() loginEvent = new EventEmitter<FormGroup>();
	constructor() {
		super();
	}

	ngOnInit(): void {
		this.form = this.loginForm;
	}

	submit(loginFormValue) {
		this.loginEvent.emit(this.form);
	}
}
