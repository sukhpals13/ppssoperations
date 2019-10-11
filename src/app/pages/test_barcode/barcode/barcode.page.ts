import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

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

  callBarCodeScanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.alertPopup('Barcode Data',JSON.stringify(barcodeData));
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
