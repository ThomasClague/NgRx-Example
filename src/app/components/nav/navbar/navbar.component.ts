import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Input() isLoggedIn: boolean;

  @Output() loginEvent = new EventEmitter();
  @Output() logOutEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.isLoggedIn);
  }

  emitLoginEvent() {
    console.log('login event');
    this.loginEvent.emit();
  }

  emitLogOutEvent() {
    console.log('logout event');
    this.logOutEvent.emit();
  }
}
