import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly URL_BASE = 'https://api.air-ways.online/';

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const apiReq = req.clone({
      url: this.URL_BASE + req.url,
      headers,
    });
    return next.handle(apiReq);
  }
}
