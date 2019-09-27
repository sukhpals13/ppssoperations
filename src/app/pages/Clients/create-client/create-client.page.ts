import { Component, OnInit } from '@angular/core';
import { PostDetailsService } from '../../../services/postDetails/post-details.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {

  // public name: string;
  public client: Object;

  constructor(
    public postDetails: PostDetailsService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.client = {
      name:undefined
    }
  }
  ionViewDidEnter(){
    this.client = {
      name:''
    }
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

  create(){
    this.postDetails.createClient(this.client).subscribe(res=>{
      console.log(res);
      this.alertPopup("Success","Client created successfully!!")
      this.navCtrl.navigateForward(['/clients/details/'+res.newOrg._id])
    },err=>{
      console.log(err);
      this.alertPopup("Error",err.error.message)
    })
  }
}
