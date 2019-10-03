import { Component, OnInit, Input, NgZone } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DeleteServicesService } from '../../services/deleteServices/delete-services.service';

@Component({
  selector: 'app-client-customizations',
  templateUrl: './client-customizations.component.html',
  styleUrls: ['./client-customizations.component.scss'],
})
export class ClientCustomizationsComponent implements OnInit {

  @Input() clientCustomizations: any;
  @Input() edit: any;
  @Input() id: any;

  public loader: boolean;

  public pickupLocationAddition: string;
  public deliveryLocationAddition: string;
  public addingPickup: boolean;

  public addingDelivery: boolean;

  constructor(
    private postDetails: PostDetailsService,
    private deleteService: DeleteServicesService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public zone: NgZone
  ) { }

  ngOnInit() {
    console.log('customization data', this.clientCustomizations);
    this.pickupLocationAddition = '';
    this.deliveryLocationAddition = '';
    this.addingPickup = false;
    this.addingDelivery = false;
  }

  ionViewDidEnter() {
  
    this.pickupLocationAddition = '';
    this.deliveryLocationAddition = '';
    this.addingPickup = false;
  }

  async alertPopup(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }


  addPickLocations() {
    this.addingPickup = true;
    if (this.clientCustomizations.pickupLocations.includes(this.pickupLocationAddition)) {
      this.alertPopup('Duplicate Error!!!', 'Pickup location with the same name already exists');
      this.addingPickup = false;
    } else {
      this.postDetails.addPickupLocation(this.id, this.pickupLocationAddition).subscribe(res => {
        this.clientCustomizations.pickupLocations.push(this.pickupLocationAddition);
        this.pickupLocationAddition = '';
        this.addingPickup = false;
        console.log(res);
      }, err => {
        console.log(err);
        this.alertPopup("Error!!!", JSON.stringify(err));
      })
    }
  }


  async deletePickLocations(p) {

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete the Pick Location?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: () => {
            loading.present();
            this.deleteService.deletePickupLocation(this.id, p)
              .subscribe(res => {
                this.zone.run(() => {
                  var index = this.clientCustomizations.pickupLocations.indexOf(p);
                  if (index > -1) {
                    this.clientCustomizations.pickupLocations.splice(index, 1)
                  }
                    })
                console.log(res);
                loading.dismiss();
              }, err => {
                console.log(err)
                loading.dismiss();
                this.alertPopup('Error deleting Location!!!', JSON.stringify(err));
              });
          }
        }
      ]
    });
    await alert.present();
  }

  addDeliveryLocations() {
    this.addingDelivery = true;
    if (this.clientCustomizations.deliveryLocations.includes(this.deliveryLocationAddition)) {
      this.alertPopup('Duplicate Error!!!', 'Delivery location with the same name already exists');
      this.addingDelivery = false;
    } else {
      this.postDetails.addDeliveryLocation(this.id, this.deliveryLocationAddition).subscribe(res => {
        this.clientCustomizations.deliveryLocations.push(this.deliveryLocationAddition);
        this.deliveryLocationAddition = '';
        this.addingDelivery = false;
        console.log(res);
      }, err => {
        console.log(err);
        this.alertPopup("Error!!!", JSON.stringify(err));
      })
    }
  }


  async deleteDeliverLocations(d) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const deleteLocation = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete the Location?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            loading.present();
            this.deleteService.deleteDeliveryLocation(this.id, d)
              .subscribe(res => {
                this.zone.run(() => {
                  var index = this.clientCustomizations.deliveryLocations.indexOf(d);
                  if (index > -1) {
                    this.clientCustomizations.deliveryLocations.splice(index, 1)
                  }
                })
                loading.dismiss();
                console.log(res)
              }, err => {
                console.log(err)
                loading.dismiss();
                this.alertPopup('Error deleting Location!!!', JSON.stringify(err));
              })
          }
        }
      ]
    });
    await deleteLocation.present();
  }

}
