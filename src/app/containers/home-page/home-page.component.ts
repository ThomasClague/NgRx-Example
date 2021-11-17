import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarPreview } from 'src/app/_interfaces/car/car-preview';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  cars$: Observable<CarPreview[]>;
  
  constructor() { }

  ngOnInit(): void {
    
    //action to load cars
    // this.store$.dispatch(
    //     new LoginStoreActions.LogoutAction()
    // );

    this.cars$ = of(JSON.parse(`[
        {
            "id": 1,
            "price": 10000,
            "title": "BMW X2 SAC M35i (Sport Auto only) 2.0 5dr",
            "photoUrl": "./assets/placeholder-01.png"
        },
        {
            "id": 2,
            "price": 20000,
            "title": "BMW X2 SAC M35i (Sport Auto only) 2.0 5dr",
            "photoUrl": "./assets/placeholder-02.png"
        },
        {
            "id": 3,
            "price": 30000,
            "title": "BMW X2 SAC M35i (Sport Auto only) 2.0 5dr",
            "photoUrl": "./assets/placeholder-03.png"
        },
        {
            "id": 4,
            "price": 40000,
            "title": "BMW X2 SAC M35i (Sport Auto only) 2.0 5dr",
            "photoUrl": "./assets/placeholder-04.png"
        },
        {
            "id": 5,
            "price": 50000,
            "title": "BMW X2 SAC M35i (Sport Auto only) 2.0 5dr",
            "photoUrl": "./assets/placeholder-05.png"
        },
        {
            "id": 6,
            "price": 60000,
            "title": "BMW X2 SAC M35i (Sport Auto only) 2.0 5dr",
            "photoUrl": "./assets/placeholder-06.png"
        }
    ]`));

  }



}
