// Used to put check on every request
import { NgZone } from '@angular/core'; 
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
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable()
export class Intercept implements HttpInterceptor {
    constructor(
        private ngZone: NgZone,
        private router: Router,
        public toastController: ToastController,
        public alertCtrl: AlertController,
        private navCtrl: NavController,
    ){}
    // public navigate(commands: any[]): void {
    //     this.ngZone.run(() => this.router.navigate(commands)).then();
    // }
    async alertPopup(title, msg) {
        const alert = await this.alertCtrl.create({
          header: title,
          message: msg,
          buttons: [{
            text: 'Okay',
            handler: (blah) => {
                this.router.navigate(['/landing-page'])
            }
          }]
        });
        await alert.present();
    }
    // handling data before request sent
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token')){
            // console.log('came here');
            const modified = req.clone({
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                  })
                });
                // handling data after response
                return next.handle(modified).pipe(
                                                map((event: HttpEvent<any>) => {
                                                    // console.log('in success')
                                                    // console.log(event)
                                                    return event;
                                                }),
                                                catchError((error: HttpErrorResponse) => {
                                                    let data = {...error};
                                                    // console.log('in error');
                                                    if(data.status==401){
                                                        // this.navCtrl.(['/landing-page']);
                                                        // this.router.navigate(['/landing-page'])
                                                        localStorage.removeItem('token');
                                                        localStorage.removeItem('user');
                                                        this.navCtrl.navigateRoot('/landing-page')
                                                        this.alertPopup("Time Out","Your session timed out!!!")
                                                        // this.router.navigate(['/landing-page'])
                                                    }
                                                    return throwError(error);
                                                })
                                            );
        }else{
            
            return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                    // console.log('in success')
                    // console.log(event)
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    let data = {...error};
                    // console.log('in error');
                    if(data.status==401){
                        // this.navCtrl.(['/landing-page']);
                        // this.router.navigate(['/landing-page'])
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        this.navCtrl.navigateRoot('/landing-page')
                        this.alertPopup("Time Out","Your session timed out!!!")
                        // this.router.navigate(['/landing-page'])
                    }
                    return throwError(error);
                })
            );;
        }
    }
}

