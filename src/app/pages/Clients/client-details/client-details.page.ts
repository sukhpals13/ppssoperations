import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';
import { DeleteServicesService } from '../../../services/deleteServices/delete-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ParentClientIdSearchComponent} from '../../../components/parent-client-id-search/parent-client-id-search.component'

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  public client: any;
  public clientId: string;
  public editMode: boolean;
  public rankAddition: string;
  public isDisabled: boolean = true;
  public assingmentAddition: string;
  public addingRank: boolean;
  public addingAssingment: boolean;
  public storedData: any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.client && this.client.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
    private postDetailsService: PostDetailsService,
    private deleteService: DeleteServicesService,
    private _Activatedroute: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public zone: NgZone,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.rankAddition = '';
    this.assingmentAddition = '';
    this.addingAssingment = false;
    this.addingRank = false;
    this.initializeClient();
  }

  initializeClient() {
    this.client = {
      name: null,
      customizations: {
        pickupLocations: [],
        deliveryLocations: []
      },
      ranksOrTitles: [null, null],
      assignments: [null, null],
      billingInfo: {},
      isShell: true
    };
  }

  ionViewDidEnter() {
    // console.log(this.router.url)
    this.rankAddition = '';
    this.assingmentAddition = '';
    this.editMode = false;
    this.addingAssingment = false;
    this.addingRank = false;
    this.initializeClient();
    this.getClient();
  }

  handleClientResponse(res){
    this.client = res.client;
      if (!this.client.billingInfo) {
        this.client.billingInfo = {}
      }
      if (this.client.customizations) {
        if (this.client.customizations.homepageMessage) {
          this.client.customizations.homepageMessage = this.client.customizations.homepageMessage.split("src='/img").join("src='https://integration.ebusiness.pittsburghpublicsafety.com/img")
        }
        if (!this.client.customizations.pickupLocations) {
          this.client.customizations.pickupLocations = []
        }
        if (!this.client.customizations.deliveryLocations) {
          this.client.customizations.deliveryLocations = []
        }
      }
  }
  getClient() {
    let clientId;
    console.log(clientId);
    // console.log(this._Activatedroute,'this._Activatedroute');
    // console.log(this.router,'this.router');
    this._Activatedroute.params.subscribe(it => {
      clientId = it.cNumber;
      this.clientId = it.cNumber;
    })
    this.getDetailsService.getClient(clientId).subscribe(res => {
      console.log(res);
      this.handleClientResponse(res);
    }, err => {
      console.log(err);
      this.alertPopup("Error!!!",JSON.stringify(err));
    })
  }

  async editToggle() {
    // let flag = false;
    
    this.zone.run(() => {
      console.log(this.client);
      let flag = true;
      if(this.client.customizations.agencyOrderAllowShippingAddress==undefined || this.client.customizations.agencyOrderAllowShippingAddress==false){
        if(!this.client.customizations.agencyOrderShippingText){
          flag = false
        }
      }
      // if(flag){
        if (this.editMode) {
          if(flag){
            this.editMode = false;
            this.postDetailsService.updateClient({...this.client})
              .subscribe(res => {
                console.log(res);
                this.handleClientResponse(res);
                this.alertPopup('Updated','Client information updated successfully')
              }, err => {
                console.log(err);
                this.alertPopup("Error!!!",JSON.stringify(err));
              });
          }else{
            this.alertPopup('Error!!!','Agency Order Shipping Text Required!!!')
          }
        } else {
          this.editMode = true;
        }
      // }
    })
    // this.editMode = !this.editMode;

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

  addRanks() {
    this.addingRank = true;
    if (this.client.ranksOrTitles.includes(this.rankAddition)) {
      this.alertPopup('Duplicate Error!!!', 'Rank with the same name already exists');
      this.addingRank = false;
    } else {
      this.postDetailsService.addRank(this.clientId, this.rankAddition).subscribe(res => {
        this.client.ranksOrTitles.push(this.rankAddition);
        this.rankAddition = '';
        this.addingRank = false;
        console.log(res);
      }, err => {
        console.log(err);
        this.alertPopup("Error!!!",JSON.stringify(err));
      })
    }
  }

  addAssingment() {
    this.addingAssingment = true;
    if (this.client.assignments.includes(this.assingmentAddition)) {
      this.alertPopup('Duplicate Error!!!', 'Assingment with the same name already exists');
      this.addingAssingment = false;
    } else {
      this.postDetailsService.addAssignment(this.clientId, this.assingmentAddition).subscribe(res => {
        this.client.assignments.push(this.assingmentAddition);
        console.log(res);
        this.assingmentAddition = '';
        this.addingAssingment = false;

      }, err => {
        console.log(err);
        this.alertPopup("Error!!!",JSON.stringify(err));
      })
    }
  }

  async deleteRank(r) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete the Rank or Titles?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            // console.log('Confirm Okay');
            // console.log(r);
            loading.present();
            this.deleteService.deleteRank(this.client._id, r)
              .subscribe(res => {
                this.zone.run(() => {
                  this.client.ranksOrTitles = this.client.ranksOrTitles.filter(v => v !== r);
                })
                console.log(res);
                loading.dismiss();
              }, err => {
                console.log(err)
                loading.dismiss();
                this.alertPopup('Error deleting Rank!!!', JSON.stringify(err));
              });
          }
        }
      ]
    });
    await alert.present();

  }

  async deleteAssignment(a) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete the Assingment?',
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
            // console.log('Confirm Okay');
            loading.present();
            this.deleteService.deleteAssignment(this.client._id, a)
              .subscribe(res => {
                this.zone.run(() => {
                  this.client.assignments = this.client.assignments.filter(v => v !== a);
                })
                loading.dismiss();
                console.log(res)
              }, err => {
                console.log(err)
                loading.dismiss();
                this.alertPopup('Error deleting Assingment!!!', JSON.stringify(err));
              })
          }
        }
      ]
    });
    await alert.present();

  }

  openSearchClient(){
    const dialogRef = this.dialog.open(ParentClientIdSearchComponent, {
      width: '250px',
      data: {parentClientId:this.client.parentClientId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result?result:"No result");
      // if(resul)
      if(result){
        this.alertPopupOptions(result)
      }
    });
  }
  async alertPopupOptions(p){
    const alert = await this.alertController.create({
      header: "Are you sure?",
      message: "Are you sure you want "+p.name+" to be the parent client ?",
      buttons: [{
        text: 'Yes',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          this.client.parentClientId = p._id;
        }
      }, {
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.openSearchClient();
        }
      }]
    });
    await alert.present();
  }
}
