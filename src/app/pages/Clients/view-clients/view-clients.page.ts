import { Component, OnInit } from '@angular/core';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.page.html',
  styleUrls: ['./view-clients.page.scss'],
})
export class ViewClientsPage implements OnInit {

  constructor(
    private getDetailsService: GetDetailsService,
  ) { }

  ngOnInit() {
    this.getClientList();
  }

  getClientList(){
    this.getDetailsService.getAllClients()
    .subscribe(res => {
      console.log('response clients', res);
    },
      err => {
        console.log(err);
      })
  }

}
