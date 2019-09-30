import { Component, OnInit, HostBinding } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';

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
  public assingmentAddition: string;
  public addingRank: boolean;
  public addingAssingment: boolean;
  public storedData: any;
  alertCtrl: any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.client && this.client.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
    private postDetailsService: PostDetailsService,
    private _Activatedroute: ActivatedRoute,
    public alertController: AlertController
    
    // private router: Router,
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
    this.getClient();
    // console.log(this.client.billingInfo.hasOwnProperty());
  }

  addRanks(){
    this.addingRank = true;
    this.postDetailsService.addRank(this.clientId,this.rankAddition).subscribe(res=>{
      this.client.ranksOrTitles.push(this.rankAddition);
      this.rankAddition = '';
      this.addingRank = false;
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  
  addAssingment(){
    this.addingAssingment = true;
    this.postDetailsService.addAssignment(this.clientId, this.assingmentAddition).subscribe(res=> {
      this.client.assignments.push(this.assingmentAddition);
      console.log(res);
      this.assingmentAddition = '';
      this.addingAssingment = false;
      
    }, err=> {
      console.log(err);
      
    }
    
    )
  }

  async deleteRank(r){
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
            console.log('Confirm Okay');
            this.client.ranksOrTitles = this.client.ranksOrTitles.filter(v=>v!==r);
          }
        }
      ]
    });
    await alert.present();
    
  }

  async deleteAssignment(a){
    // console.log(a);
    // this.client.assignments = this.client.assignments.filter(v=>v!==a);

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
            console.log('Confirm Okay');
            this.client.assignments = this.client.assignments.filter(v=>v!==a);
          }
        }
      ]
    });
    await alert.present();

  }

}
