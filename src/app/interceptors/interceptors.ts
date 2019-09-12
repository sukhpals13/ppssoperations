// Used to put check on every request
import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { TokenResponse } from '@openid/appauth';
// import { Observable, of } from "rxjs";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { NavController } from '@ionic/angular';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable()
export class Intercept implements HttpInterceptor {
    constructor(private navCtrl: NavController,public toastController: ToastController, public alertCtrl: AlertController){}
    async alertPopup(title, msg) {
        const alert = await this.alertCtrl.create({
          header: title,
          message: msg,
          buttons: [{
            text: 'Okay'
          }]
        });
        await alert.present();
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token')){
            // console.log('came here');
            const modified = req.clone({
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                  })
                });
                return next.handle(modified).pipe(
                                                map((event: HttpEvent<any>) => {
                                                    return event;
                                                }),
                                                catchError((error: HttpErrorResponse) => {
                                                    let data = {...error};
                                                    console.log('came here 2')
                                                    if(data.status==401){
                                                        this.navCtrl.navigateRoot('/auth/login');
                                                        this.alertPopup("Time Out","Your session timed out!!!")
                                                    }
                                                    return throwError(error);
                                                })
                                            );
        }else{
            
            return next.handle(req);
        }
    }
}

