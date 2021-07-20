import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';

const CACHE_IT = new HttpContextToken<boolean>(() => false);

export function cacheIt(): any {
  return new HttpContext().set(CACHE_IT, true);
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.context.get(CACHE_IT)){
        return ;
    }

    return next.handle(request);
  }
}
