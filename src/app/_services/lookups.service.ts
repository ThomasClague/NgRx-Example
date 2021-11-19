import { Injectable } from '@angular/core';
import { Lookups } from '../_interfaces/lookups/lookups';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

	constructor(private repository: RepositoryService) {}

	load() {
		return this.repository.getData<Lookups>('lookups');
	}

}
