import { FormGroup } from '@angular/forms';

export class FormBase {
	form: FormGroup;
	isLoading: boolean;

	public validateControl(controlName: string) {
		if (
			this.form.controls[controlName].invalid &&
			this.form.controls[controlName].touched
		) {
			return true;
		}
		return false;
	}

	public hasError(controlName: string, errorName: string) {
		if (this.form.controls[controlName].hasError(errorName)) {
			return true;
		}
		return false;
	}
}
