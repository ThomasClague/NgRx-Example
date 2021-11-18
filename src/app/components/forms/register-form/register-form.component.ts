import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from 'src/app/_shared/base/form-base/form-base.component';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.sass'],
})
export class RegisterFormComponent extends FormBase implements OnInit {
	@Input() registerForm: FormGroup;
	@Input() loading: boolean;
	@Output() registerEvent = new EventEmitter<FormGroup>();
	constructor() {
		super();
	}

	ngOnInit(): void {
		this.form = this.registerForm;
		this.isLoading = this.loading;
		this.isLoading = this.loading;
	}

	submit(registerFormValue) {
		this.registerEvent.emit(this.form);
	}
}
