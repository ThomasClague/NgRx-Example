import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
	@Input() isLoggedIn: boolean;

	@Output() logOutEvent = new EventEmitter();

	constructor() {}

	ngOnInit(): void {
		console.log(this.isLoggedIn);
	}

	emitLogOutEvent() {
		console.log('logout event');
		this.logOutEvent.emit();
	}
}
