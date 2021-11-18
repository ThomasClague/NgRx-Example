import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';

@Injectable()
export class RepositoryService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  public getData<T>(route: string) {
    return this.http.get<T>(this.createCompleteRoute(route, this.apiUrlService.apiUrl), this.generateHeaders());
  }

  public create(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.apiUrlService.apiUrl), body, this.generateHeaders());
  }

  public edit(route: string, body) {
    return this.http.patch(this.createCompleteRoute(route, this.apiUrlService.apiUrl), body, this.generateHeaders());
  }

  public upload(route: string, file: File): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.createCompleteRoute(route, this.apiUrlService.apiUrl), formData, {reportProgress: true, observe: 'events'});
  }

  public delete(route: string) {
    return this.http.delete(this.createCompleteRoute(route, this.apiUrlService.apiUrl));
  }

  private createCompleteRoute(route: string, apiUrl: string) {
    return `${apiUrl}${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    };
  }
}