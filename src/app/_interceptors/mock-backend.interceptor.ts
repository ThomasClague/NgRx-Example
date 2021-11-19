import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../_interfaces/user/user';
import { LoginResponse } from '../_interfaces/responses/auth/login-response';
import { RegisterRequest } from '../_interfaces/requests/auth/register-request';
import { ToastrService } from 'ngx-toastr';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const { url, method, headers, body } = request;

		// wrap in delayed observable to simulate server api call
		return of(null)
			.pipe(mergeMap(handleRoute))
			.pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
			.pipe(delay(1000))
			.pipe(dematerialize());

		function handleRoute() {
			console.log('url', url);


			switch (true) {
				case url.endsWith('/users/authenticate') && method === 'POST':
					return authenticate();
				case url.endsWith('/users/register') && method === 'POST':
					return register();
				case url.endsWith('/users') && method === 'GET':
					return getUsers();
				case url.match(/\/users\/\d+$/) && method === 'GET':
					return getUserById();
				case url.match(/\/users\/\d+$/) && method === 'PUT':
					return updateUser();
				case url.match(/\/users\/\d+$/) && method === 'DELETE':
					return deleteUser();
				case url.endsWith('/lookups') && method === 'GET':
					return loadLookups();
				default:
					// pass through any requests not handled above
					return next.handle(request);
			}
		}

		// route functions

		function authenticate(): Observable<HttpResponse<LoginResponse>> {
			console.log('in mock authenticate');
			const { username, password } = body;
			console.log('body', body);
			console.log('username', username);
			const user = users.find((x) => {
				return x.username === username && x.password === password;
			});
			if (!user) return error('Username or password is incorrect');

			console.log('mock authentication response', user);
			return ok(user);
		}

		function register() {
			const userForRegister: RegisterRequest = body;

			if (users.find((x) => x.username === userForRegister.username)) {
				return error('Username "' + userForRegister.username + '" is already taken');
			}

			let user: User = {
				id: users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1,
				username: userForRegister.username,
				firstName: userForRegister.firstname,
				lastName: userForRegister.lastname,
				password: userForRegister.password,
				token: 'a fake token'
			}

			users.push(user);
			localStorage.setItem('users', JSON.stringify(users));
			return ok();
		}

		function getUsers() {
			if (!isLoggedIn()) return unauthorized();
			return ok(users);
		}

		function getUserById() {
			if (!isLoggedIn()) return unauthorized();

			const user = users.find((x) => x.id === idFromUrl());
			return ok(user);
		}

		function updateUser() {
			if (!isLoggedIn()) return unauthorized();

			let params = body;
			let user = users.find((x) => x.id === idFromUrl());

			// only update password if entered
			if (!params.password) {
				delete params.password;
			}

			// update and save user
			Object.assign(user, params);
			localStorage.setItem('users', JSON.stringify(users));

			return ok();
		}

		function deleteUser() {
			if (!isLoggedIn()) return unauthorized();

			users = users.filter((x) => x.id !== idFromUrl());
			localStorage.setItem('users', JSON.stringify(users));
			return ok();
		}

		function loadLookups() {
			let lookups = JSON.parse(getLookupData())
			return ok(lookups);
		}

		// helper functions

		function ok(body?: any) {
			return of(new HttpResponse({ status: 200, body }));
		}

		function error(message: string) {
			return throwError({ error: { message } });
		}

		function unauthorized() {
			return throwError({
				status: 401,
				error: { message: 'Unauthorised' },
			});
		}

		function isLoggedIn() {
			return headers.get('Authorization') === 'Bearer fake-jwt-token';
		}

		function idFromUrl() {
			const urlParts = url.split('/');
			return parseInt(urlParts[urlParts.length - 1]);
		}

		function getLookupData() {
			return `
			{

				"makes": [
					{ "key": 1, "value": "Aston Martin"},
					{ "key": 2, "value": "Bentley"},
					{ "key": 3, "value": "Ford"},
					{ "key": 4, "value": "Land Rover"},
					{ "key": 5, "value": "Mini"},
					{ "key": 6, "value": "Vauxhaul"}
				],
				"models": [
					{
						"key": 1,
						"value": {
							"makeId": 1,
							"value": "DB6"
						}
					},
					{
						"key": 2,
						"value": {
							"makeId": 1,
							"value": "DBS"
						}
					},
					{
						"key": 3,
						"value": {
							"makeId": 1,
							"value": "Vantage"
						}
					},
					{
						"key": 4,
						"value": {
							"makeId": 2,
							"value": "Continental S"
						}
					},
					{
						"key": 5,
						"value": {
							"makeId": 2,
							"value": "Continental T"
						}
					},
					{
						"key": 6,
						"value": {
							"makeId": 2,
							"value": "Mulsanne"
						}
					},
							{
						"key": 7,
						"value": {
							"makeId": 3,
							"value": "Fiesta"
						}
					},
					{
						"key": 8,
						"value": {
							"makeId": 3,
							"value": "Focus"
						}
					},
					{
						"key": 9,
						"value": {
							"makeId": 3,
							"value": "Focus RS"
						}
					},
					{
						"key": 10,
						"value": {
							"makeId": 4,
							"value": "Defender"
						}
					},
					{
						"key": 11,
						"value": {
							"makeId": 4,
							"value": "Discovery"
						}
					},
					{
						"key": 12,
						"value": {
							"makeId": 4,
							"value": "Autobiography"
						}
					},
					{
						"key": 13,
						"value": {
							"makeId": 5,
							"value": "Cooper"
						}
					},
					{
						"key": 14,
						"value": {
							"makeId": 5,
							"value": "Cooper S"
						}
					},
					{
						"key": 15,
						"value": {
							"makeId": 5,
							"value": "John Cooper Works"
						}
					},
							{
						"key": 16,
						"value": {
							"makeId": 6,
							"value": "Astra"
						}
					},
					{
						"key": 17,
						"value": {
							"makeId": 6,
							"value": "Corsa"
						}
					},
					{
						"key": 18,
						"value": {
							"makeId": 6,
							"value": "Corsa VXR"
						}
					}
				]
			}`
		}
	}
}

export const fakeBackendProvider = {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: MockBackendInterceptor,
	multi: true,
};
