// Used to put check on every request
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class Intercept implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Added withCredentials true in inital request
        const modified = req.clone({
            withCredentials: true
        });
        return next.handle(modified);
    }
}