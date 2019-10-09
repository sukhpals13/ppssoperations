import { Component, OnInit } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';

@Component({
  selector: 'app-client-user-roles',
  templateUrl: './client-user-roles.component.html',
  styleUrls: ['./client-user-roles.component.scss'],
})
export class ClientUserRolesComponent implements OnInit {

  constructor(

    private getDetailService: GetDetailsService,
  ) { }

  ngOnInit() {
     this.getuserroles();
  }

  getuserroles(){
     return this.getDetailService.getClientUserRoles('5d2a1717eccc890dd45b0683')
     .subscribe(res =>{
        console.log('get user roles', res);
     }, err =>{
      console.log(err);
     }
      )
  }

}
