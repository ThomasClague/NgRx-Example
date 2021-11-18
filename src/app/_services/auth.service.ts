import { Injectable } from '@angular/core';
import { LoginRequest } from '../_interfaces/requests/auth/login-request';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private repository: RepositoryService,) { }

  login(model: LoginRequest) {
    return this.repository.create('users/authenticate', model);
  }
}
