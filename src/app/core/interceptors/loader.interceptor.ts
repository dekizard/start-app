import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoaderService } from '../../shared/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  private queue: any[] = [];
  
  constructor(private loaderService: LoaderService) {}
  

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('hide-loader')) {
      const copiedReq = req.clone();
      copiedReq.headers.delete('hide-loader');
      return next.handle(copiedReq);
    }

    this.showLoader();

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.hideLoader();
          }
        },
        (err: any) => {
          this.hideLoader();
        }
      )
    );
  }

  private showLoader(): void {
    this.queue.push({});

    if (this.queue.length > 0) {
      setTimeout(() => {
        if (this.queue.length) {
          this.loaderService.show();
        }
      }, 500);
    }
  }

  private hideLoader(): void {
    this.queue.pop();

    if (this.queue.length === 0) {
      setTimeout(() => {
        if (this.queue.length === 0) {
          this.loaderService.hide();
        }
      }, 1);
    }
  }
}
