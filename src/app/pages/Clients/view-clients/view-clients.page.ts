import { Component, OnInit, HostBinding } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';
import { ClientsListModel } from '../../../interfaces/clients'


@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.page.html',
  styleUrls: ['./view-clients.page.scss'],
})
export class ViewClientsPage implements OnInit {

  clients: ClientsListModel;
  searchText: string;

 

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService,
    public menu: MenuController,
  ) { }

  @HostBinding('class.is-shell') get isShell() {
    return (this.clients && this.clients.isShell) ? true : false;
  }

  ngOnInit() {
    this.clients = {
      name: null,
      clientNumber: null,
      clients: [],
      isShell: true,
      
    };
    this.initializeData();
    this.getClientList();
  }

  initializeData(){
    this.clients.clients = [];
    var i =0;
    while(i<6){
      var obj = {
        name: null,
        clientNumber: null,
        isShell: true
      };
      this.clients.clients.push(obj);
      i++;
    }
  }

  getClientList(){
    this.getDetailsService.getAllClients()
    .subscribe(res => {
      
      this.clients = res;
      console.log('response clients', this.clients);
    },
      err => {
        console.log(err);
      })
  }

  viewClientDetails(c){
    this.navCtrl.navigateForward('/clients/details/'+c._id);
  }

}
