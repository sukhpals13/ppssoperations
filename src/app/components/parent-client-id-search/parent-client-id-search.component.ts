import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GetDetailsService} from '../../services/getDetails/get-details.service';
import { AlertController } from '@ionic/angular';

export interface DialogData {
  animal: string;
  name: string;
  // searchText: string;
};

@Component({
  selector: 'app-parent-client-id-search',
  templateUrl: './parent-client-id-search.component.html',
  styleUrls: ['./parent-client-id-search.component.scss'],
})
export class ParentClientIdSearchComponent implements OnInit {

  public searchParam: string;
  public parentClient: any;
  public isLength: boolean;

  constructor(
    public dialogRef: MatDialogRef<ParentClientIdSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private getDetails: GetDetailsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

     this.parentClient = [];
     this.isLength = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getClientList(searchParam){
    console.log(searchParam);
    this.getDetails.getAllClients(searchParam)
    .subscribe(res=>{
      console.log(res);
      this.parentClient = res.clients;
      if(this.parentClient.length == 0){
         this.isLength = true;
      }
      else{
        this.isLength = false;
      }
    },err=>{
      console.log(err);
    })
  }

  // async alertPopup(title, msg) {
  //   const alert = await this.alertController.create({
  //     header: title,
  //     message: msg,
  //     buttons: [{
  //       text: 'Okay'
  //     }]
  //   });
  //   await alert.present();
  // }

  // async confirm(p){
  //   this.onNoClick();
  //   const alert = await this.alertController.create({
  //     header: "Are you Sure?",
  //     message: "Are you sure you want to make "+p.name+" as the parent client ?",
  //     buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       cssClass: 'Disagree',
  //       handler: (blah) => {
  //         console.log('Confirm Cancel: blah');
  //       }
  //     }, {
  //       text: 'Agree',
  //       handler: () => {
  //         console.log('Confirm Okay');
  //       }
  //     }
  //   ]
  //   });
  //   await alert.present();
  // }

}
