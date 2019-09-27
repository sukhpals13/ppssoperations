import { Component, OnInit, HostBinding } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  public client : any;
  public clientId : string;

  @HostBinding('class.is-shell') get isShell() {
    return (this.client && this.client.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
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
    let clientId
    this._Activatedroute.params.subscribe(it => {
      clientId = it.cNumber;
    })
    console.log(clientId);
    this.getDetailsService.getClient(clientId).subscribe(res=>{
      console.log(res);
      this.client = res.client;
    },err=>{
      console.log(err);
    })
  }
  

}
