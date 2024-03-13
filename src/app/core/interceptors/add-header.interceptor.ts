import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let userToken = localStorage.getItem('token');
    if (userToken) {
      let newReq = request.clone(
        { headers: request.headers.set('token', userToken) }
      );
      return next.handle(newReq);
    }

    return next.handle(request);


  }
}
