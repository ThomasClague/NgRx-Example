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
import { RootStoreModule } from './_store';
import { AuthService } from './_services/auth.service';
import { ApiUrlService } from './_services/api-url.service';
import { RepositoryService } from './_services/repository.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		PreviewCarComponent,
		NavContainerComponent,
		NavbarComponent,
		FooterComponent,
		PreviewCarListComponent,
		LoginPageComponent,
		RegisterPageComponent,
		LoginFormComponent,
		RegisterFormComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		RootStoreModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [
		AuthService,
		ApiUrlService,
		RepositoryService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MockBackendInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
