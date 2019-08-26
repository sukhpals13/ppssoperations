import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class Intercept implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modified = req.clone({
            withCredentials: true
        });
        return next.handle(modified);
    }
}