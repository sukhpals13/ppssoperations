import { Component, OnInit, NgZone, HostBinding, Input } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  public editMode: boolean;
  public userId: string;
  public user: any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.user && this.user.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
    private _Activatedroute: ActivatedRoute,
    public zone: NgZone,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {

    this.user = {
      name: null,
      UserNumber: null,
      users: [],
      isShell: true,
      
    };


    this.editMode = false;
    this.viewUserDetails(this.user);
  }

  initializeData(){
    this.user.user = [];
    var i =0;
    while(i<6){
      var obj = {
        name: null,
        UserNumber: null,
        isShell: true
      };
      this.user.user.push(obj);
      i++;
    }
  }

  viewUserDetails(user){
    this.initializeData();
    console.log('function calling', user);
    let userId;
    this._Activatedroute.params.subscribe(it => {
      userId = it.uNumber;
      this.userId = it.uNumber;
    })
     return this.getDetailsService.getUser(userId)
     .subscribe(res =>{
        console.log('user detail response',res);
        this.user = res;
        console.log('user detail',this.user);
     }, err => {
        console.log(err);
     });
  }


  // get user details

  


  async editToggle() {
    
    this.zone.run(() => {
      let flag = true;
      // if(flag){
        if (this.editMode) {
          if(flag){
            this.editMode = false;
            // this.postDetailsService.updateClient({...this.client})
            //   .subscribe(res => {
            //     console.log(res);
            //     this.handleClientResponse(res);
            //     this.alertPopup('Updated','Client information updated successfully')
            //   }, err => {
            //     console.log(err);
            //     this.alertPopup("Error!!!",JSON.stringify(err));
            //   });
          }else{
            // this.alertPopup('Error!!!','Agency Order Shipping Text Required!!!')
          }
        } else {
          this.editMode = true;
        }
      // }
    })
    // this.editMode = !this.editMode;

  }

  // ionViewDidEnter() {
  //    this.viewUserDetails(user);
  // }



}
