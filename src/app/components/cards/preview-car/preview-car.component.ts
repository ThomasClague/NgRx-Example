import { Component, Input, OnInit } from '@angular/core';
import { CarPreview } from 'src/app/_interfaces/car/car-preview';

@Component({
	selector: 'app-preview-car',
	templateUrl: './preview-car.component.html',
	styleUrls: ['./preview-car.component.sass'],
})
export class PreviewCarComponent implements OnInit {
	@Input() car: CarPreview;

	constructor() {}

	ngOnInit(): void {}
}
