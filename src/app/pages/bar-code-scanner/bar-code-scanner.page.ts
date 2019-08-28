import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bar-code-scanner',
  templateUrl: './bar-code-scanner.page.html',
  styleUrls: ['./bar-code-scanner.page.scss'],
})
export class BarCodeScannerPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  callBarCodeScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.alertPopup('BarCodeData',JSON.stringify(barcodeData))
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async alertPopup(title,msg){
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }
}
