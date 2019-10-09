import { Component, OnInit, Input } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';

@Component({
  selector: 'app-client-user-roles',
  templateUrl: './client-user-roles.component.html',
  styleUrls: ['./client-user-roles.component.scss'],
})
export class ClientUserRolesComponent implements OnInit {

  @Input() id: any;
  @Input() edit: any;

  constructor(

    private getDetailService: GetDetailsService,
  ) { }

  ngOnInit() {
     this.getuserroles();
  }

  getuserroles(){
     return this.getDetailService.getClientUserRoles(this.id)
     .subscribe(res =>{
        console.log('get user roles', res);
     }, err =>{
      console.log(err);
     }
      )
  }

}
