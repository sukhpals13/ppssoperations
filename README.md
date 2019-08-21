CheeseBurgerTech Test
==========
**CheeseBurgerTech Test** experiencing the best of new features about this new and definitive release: Angular 7 + Ionic 4 final.

* Angular 7
* @ionic/angular 4.0.0
* Ionic Native 5
* Ionic 4 Components/API Samples
* 6 Page Samples (8 with modals)
* 2 Page modals
* 2 Components

<br><br><br><br><br><br><br>

---

Requirements
------------

* Node 8.13+
* Npm 6+
* Ionic CLI 4.5
* Android Studio (for android)
* Xcode (for ios)

Installing
------------

```
$ npm install
```


Running PWA
------------

```
$ ionic build --prod
www folder would be created for your PWA. Install http-server for running PWA by
$ npm install -g http-server
then
$ http-server ./www -p 8888
to run the service at https://localhost:8888
```


Testing Android
------------

```
first run
$ ionic cordova prepare android

  then

$ ionic cordova run android -l
For running on emulator with android studios

  OR

$ ionic cordova build android
After that simply transfer the apk file from root-folder/platforms/android/app/build/outputs/apk/debug/app-debug.apk to your android phone and install it
```


Testing iOS
------------

```
first
$ ionic cordova prepare ios

  then

$ ionic cordova run ios -l --address=0.0.0.0
For running on xcode which should be installed in your mac, with a running apple device simulator

```
___
