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

// array in local storage for registered users
let users: User[] = [];

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
			.pipe(delay(500))
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
			console.log('in register');
			const userForRegister: RegisterRequest = body;

			if (users.find((x) => x.username === userForRegister.username)) {
				return error('Username "' + userForRegister.username + '" is already taken');
			}
			let user: User;
			user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;

			user.username = userForRegister.username;
			user.firstName = userForRegister.firstname;
			user.lastName = userForRegister.lastname;
			user.password = userForRegister.password;
			user.token = 'a fake token';

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
	}
}

export const fakeBackendProvider = {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: MockBackendInterceptor,
	multi: true,
};
