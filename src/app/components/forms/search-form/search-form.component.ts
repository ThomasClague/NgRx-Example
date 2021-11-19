import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Make } from 'src/app/_interfaces/lookups/make';
import { Model } from 'src/app/_interfaces/lookups/model';
import { FormBase } from 'src/app/_shared/base/form-base/form-base.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.sass']
})
export class SearchFormComponent extends FormBase implements OnInit {
	
  @Input() searchForm: FormGroup;
	@Input() makes: Make[];
	@Input() models: Model[];
	@Output() searchEvent = new EventEmitter<FormGroup>();

  minCurrencies = [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
  maxCurrencies = [800, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 75000, 100000, 250000, 1000000];

	constructor() {
		super();
	}

  ngOnInit(): void {
    console.log('this.models', this.models);
  }

  searchClicked() {
    this.searchEvent.emit();
  }
}
