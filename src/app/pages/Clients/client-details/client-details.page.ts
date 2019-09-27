import { Component, OnInit, HostBinding } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  public client : any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.client && this.client.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
  ) { }

  ngOnInit() {
    this.client = {
      name:null,
      customizations:{

      },
      ranksOrTitles:[null,null],
      assignments:[null,null],
      isShell: true
    };
  }
  ionViewDidEnter(){
    this.getDetailsService.getClient().subscribe(res=>{
      console.log(res);
      this.client = res.client;
    },err=>{
      console.log(err);
    })
  }

}
