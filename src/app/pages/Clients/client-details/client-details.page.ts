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
  public editMode : boolean;
  public rankAddition: string;
  public assingmentAddition: string;
  public storedData: any;

  @HostBinding('class.is-shell') get isShell() {
    return (this.client && this.client.isShell) ? true : false;
  }

  constructor(
    private getDetailsService: GetDetailsService,
    private _Activatedroute: ActivatedRoute,
    // private router: Router,
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.rankAddition = '';
    this.assingmentAddition = '';
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
    // console.log(this.router.url)
    this.rankAddition = '';
    this.assingmentAddition = '';
    let clientId;
    this.editMode = false;
    // console.log(this._Activatedroute,'this._Activatedroute');
    // console.log(this.router,'this.router');
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
  editToggle(){
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }
  addRanks(){
    this.client.ranksOrTitles.push(this.rankAddition);
    this.rankAddition = '';
  }
  addAssingment(){
    this.client.assignments.push(this.assingmentAddition);
    this.assingmentAddition = '';
  }
  deleteRank(r){
    // console.log(r);
    this.client.ranksOrTitles = this.client.ranksOrTitles.filter(v=>v!==r);
  }
  deleteAssignment(a){
    // console.log(a);
    this.client.assignments = this.client.assignments.filter(v=>v!==a);
  }
  

}
