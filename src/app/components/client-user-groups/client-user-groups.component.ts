import { Component, OnInit, Input } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';

@Component({
  selector: 'app-client-user-groups',
  templateUrl: './client-user-groups.component.html',
  styleUrls: ['./client-user-groups.component.scss'],
})
export class ClientUserGroupsComponent implements OnInit {
  
  @Input() id: any;
  @Input() edit: any;
  
  constructor(
    private getDetailService: GetDetailsService,
  ) { }

  ngOnInit() {
    this.getuserGroups();
  }

  getuserGroups(){
    return this.getDetailService.getClientUserGroups(this.id)
    .subscribe(res =>{
       console.log('get user groups', res);
    }, err =>{
     console.log(err);
    }
     )
 }

}
