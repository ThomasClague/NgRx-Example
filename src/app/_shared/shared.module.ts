import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBase } from './base/form-base/form-base.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ToastrModule.forRoot()
	],
})
export class SharedModule {}
