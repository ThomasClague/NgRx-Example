import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockBackendInterceptor } from './_interceptors/mock-backend.interceptor';
import { SharedModule } from './_shared/shared.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { NavContainerComponent } from './containers/nav-container/nav-container.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import { PreviewCarComponent } from './components/cards/preview-car/preview-car.component';
import { PreviewCarListComponent } from './components/lists/preview-car-list/preview-car-list.component';

@NgModule({
	declarations: [
		AppComponent,
  		HomePageComponent,
  		PreviewCarComponent,
    	NavContainerComponent,
    	NavbarComponent,
    	FooterComponent,
     PreviewCarListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule
	],
	providers: [
		MockBackendInterceptor
	],
	bootstrap: [
		AppComponent
	],
})
export class AppModule {}
