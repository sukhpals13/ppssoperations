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
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// custom HTTP requests services 
import { AuthService } from './services/auth/auth.service';
import { GetDetailsService } from './services/getDetails/get-details.service';
import { PostDetailsService } from './services/postDetails/post-details.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { IonicStorageModule } from '@ionic/storage';

import {FileUploadModule} from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AuthModule,
    IonicStorageModule.forRoot(),
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, { cloud_name: 'dkqbcwlev', upload_preset: 'mkxkglld'}),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    GetDetailsService,
    PostDetailsService,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: Intercept, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
