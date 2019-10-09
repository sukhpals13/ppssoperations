import { Component, OnInit } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';

@Component({
  selector: 'app-client-user-groups',
  templateUrl: './client-user-groups.component.html',
  styleUrls: ['./client-user-groups.component.scss'],
})
export class ClientUserGroupsComponent implements OnInit {

  constructor(
    private getDetailService: GetDetailsService,
  ) { }

  ngOnInit() {
    this.getuserGroups();
  }

  getuserGroups(){
    return this.getDetailService.getClientUserGroups('5d2a1717eccc890dd45b0683')
    .subscribe(res =>{
       console.log('get user groups', res);
    }, err =>{
     console.log(err);
    }
     )
 }

}
