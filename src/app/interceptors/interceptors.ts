// Used to put check on every request
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { TokenResponse } from '@openid/appauth';

@Injectable()
export class Intercept implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(localStorage.getItem('tokenResponse'))
        if(localStorage.getItem('tokenResponse')!=null){
            console.log('came here');
            let token = JSON.parse(localStorage.getItem('tokenResponse')),
            authToken = token.tokenResponse.tokenType+' '+token.tokenResponse.idToken;
            const modified = req.clone({
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'Authorization': authToken
                  })
                });
                return next.handle(modified);
        }else{
            console.log('did not come there');
            const modified = req.clone({

            });
            return next.handle(modified);
        }
        // console.log(modified,'came here');
    }
}

