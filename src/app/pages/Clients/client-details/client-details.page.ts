import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';
import { DeleteServicesService } from '../../../services/deleteServices/delete-services.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  public client : any;
  public clientId : string;
  public editMode : boolean;
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
    public zone: NgZone
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.rankAddition = '';
    this.assingmentAddition = '';
    this.addingAssingment = false;
    this.addingRank = false;
    this.client = {
      name:null,
      customizations:{ },
      ranksOrTitles:[null,null],
      assignments:[null,null],
      billingInfo:{  },
      isShell: true
    };
  }

  ionViewDidEnter(){
    // console.log(this.router.url)
    this.rankAddition = '';
    this.assingmentAddition = '';
    this.editMode = false;
    this.addingAssingment = false;
    this.addingRank = false;
    this.getClient();
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
    this.getDetailsService.getClient(clientId).subscribe(res=>{
      console.log(res);
      this.client = res.client;
      if(!this.client.billingInfo){
        this.client.billingInfo = {}
      }
    },err=>{
      console.log(err);
    })
  }

  editToggle(){
    let flag = false;
    this.editMode = !this.editMode;
    console.log(this.client);
    for(var prop in this.client.billingInfo) {
      if (this.client.billingInfo.hasOwnProperty(prop)) {
          flag = true;
          break;
      }
    }
    if(flag)
      this.getClient();
  }

  async alertPopup(title,msg){
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Okay'
      }]
    });
    await alert.present();
  }

  addRanks(){
    this.addingRank = true;
    if(this.client.ranksOrTitles.includes(this.rankAddition)){
      this.alertPopup('Duplicate Error!!!','Rank with the same name already exists');
      this.addingRank = false;
    }else{
      this.postDetailsService.addRank(this.clientId,this.rankAddition).subscribe(res=>{
        this.client.ranksOrTitles.push(this.rankAddition);
        this.rankAddition = '';
        this.addingRank = false;
        console.log(res);
      },err=>{
        console.log(err);
      })
    }
  }

  addAssingment(){
    this.addingAssingment = true;
    if(this.client.assignments.includes(this.assingmentAddition)){
      this.alertPopup('Duplicate Error!!!','Assingment with the same name already exists');
      this.addingAssingment = false;
    }else{
      this.postDetailsService.addAssignment(this.clientId, this.assingmentAddition).subscribe(res=> {
        this.client.assignments.push(this.assingmentAddition);
        console.log(res);
        this.assingmentAddition = '';
        this.addingAssingment = false;
        
      }, err=> {
        console.log(err);
      })
    }
  }

  async deleteRank(r){
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
            this.deleteService.deleteRank(this.client._id,r)
            .subscribe(res=>{
              this.zone.run(()=>{
                this.client.ranksOrTitles = this.client.ranksOrTitles.filter(v=>v!==r);
              })
              console.log(res);
              loading.dismiss();
            },err=>{
              console.log(err)
              loading.dismiss();
              this.alertPopup('Error deleting Rank!!!',JSON.stringify(err));
            });
          }
        }
      ]
    });
    await alert.present();
    
  }

  async deleteAssignment(a){
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
            this.deleteService.deleteAssignment(this.client._id,a)
            .subscribe(res=>{
              this.zone.run(()=>{
                this.client.assignments = this.client.assignments.filter(v=>v!==a);
              })
              loading.dismiss();
              console.log(res)
            },err=>{
              console.log(err)
              loading.dismiss();
              this.alertPopup('Error deleting Assingment!!!',JSON.stringify(err));
            })
          }
        }
      ]
    });
    await alert.present();

  }

}
