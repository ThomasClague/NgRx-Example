import { Component, Input, OnInit } from '@angular/core';
import { CarPreview } from 'src/app/_interfaces/car/car-preview';

@Component({
	selector: 'app-preview-car-list',
	templateUrl: './preview-car-list.component.html',
	styleUrls: ['./preview-car-list.component.sass'],
})
export class PreviewCarListComponent implements OnInit {
	@Input() cars: CarPreview[];

	constructor() {}

	ngOnInit(): void {}
}
