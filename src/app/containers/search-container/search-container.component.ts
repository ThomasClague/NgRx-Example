import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Make } from 'src/app/_interfaces/lookups/make';
import { Model } from 'src/app/_interfaces/lookups/model';
import { LookupsStoreSelectors, LookupsStoreState } from 'src/app/_store/lookups-store';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.sass']
})
export class SearchContainerComponent implements OnInit, OnDestroy {
	
  searchForm: FormGroup;

	makes$: Observable<Make[]>;
	models$: Subject<Model[]> = new Subject<Model[]>();

  subscriptions$: Subscription[] = [];

  constructor(
		private fb: FormBuilder,
		private store$: Store<LookupsStoreState.State>
	) {}

  
	ngOnInit(): void {
		this.buildForm();
    this.addFormHandler();

		this.makes$ = this.store$.select(LookupsStoreSelectors.getMakes);

    this.subscriptions$.push(this.store$.select(LookupsStoreSelectors.getModelsForMake(null)).subscribe(res => {
      this.models$.next(res);
    }));

    this.subscriptions$.push(this.models$.subscribe(res => {
      console.log('models', res);
      if(res?.length > 0){
        this.searchForm.get('modelId').enable();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  private buildForm() {
		this.searchForm = this.fb.group({
			makeId: [],
			modelId: {value: null, disabled: true},
			minPrice: [],
			maxPrice: [],
		});
	}

  private addFormHandler() {
    this.subscriptions$.push(this.searchForm.get('makeId').valueChanges.pipe(
      switchMap(() => this.store$.select(LookupsStoreSelectors.getModelsForMake(this.searchForm.get('makeId').value)))
    ).subscribe(val => {
      this.models$.next(val);
    }));
  }
  getValues() {

  }

}
