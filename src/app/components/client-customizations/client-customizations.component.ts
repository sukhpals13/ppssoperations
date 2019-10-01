import { Component, OnInit, Input } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    console.log('customization data',this.clientCustomizations);
    this.pickupLocationAddition = '';
    this.deliveryLocationAddition = '';
    this.addingPickup = false;
    this.addingDelivery = false;
  }
  addPickLocations(){
    console.log(this.pickupLocationAddition);
    this.clientCustomizations.pickupLocations.push(this.pickupLocationAddition);
    this.pickupLocationAddition = '';
  }
  deletePickLocations(p){
    console.log(this.pickupLocationAddition);
    var index = this.clientCustomizations.pickupLocations.indexOf(p);
    if(index>-1){
      this.clientCustomizations.pickupLocations.splice(index,1)  
    }
    // this.clientCustomizations.pickupLocations = this.clientCustomizations.pickupLocations.filter(v=>v!==p);
  }

  addDeliveryLocations(){
    console.log(this.pickupLocationAddition);
    this.clientCustomizations.deliveryLocations.push(this.deliveryLocationAddition);
    this.deliveryLocationAddition = '';
  }
  deleteDeliverLocations(d){
    console.log(this.pickupLocationAddition);
    var index = this.clientCustomizations.deliveryLocations.indexOf(d);
    if(index>-1){
      this.clientCustomizations.deliveryLocations.splice(index,1)  
    }
    // this.clientCustomizations.deliveryLocations = this.clientCustomizations.deliveryLocations.filter(v=>v!==d);
  }

}
