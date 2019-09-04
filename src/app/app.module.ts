import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';

import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

// Interceptors
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Intercept } from './interceptors/interceptors';

// HTTP requests
import { AuthService } from './services/auth/auth.service';
import { GetDetailsService } from './services/getDetails/get-details.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    GetDetailsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: Intercept, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
