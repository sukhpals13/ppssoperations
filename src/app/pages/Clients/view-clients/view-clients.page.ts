import { Component, OnInit, HostBinding } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';
import { ClientsListModel } from '../../../interfaces/clients'
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.page.html',
  styleUrls: ['./view-clients.page.scss'],
})
export class ViewClientsPage implements OnInit {

  clients: ClientsListModel;
  searchText: string = " ";

 

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
      clients: [],
      isShell: true
    };
    this.getClientList();
  }

  getClientList(){
    this.getDetailsService.getAllClients(this.searchText)
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
