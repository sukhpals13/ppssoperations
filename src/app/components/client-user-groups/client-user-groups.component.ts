import { Component, OnInit, Input } from '@angular/core';
import { GetDetailsService } from '../../services/getDetails/get-details.service';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { DeleteServicesService } from '../../services/deleteServices/delete-services.service';

@Component({
  selector: 'app-client-user-groups',
  templateUrl: './client-user-groups.component.html',
  styleUrls: ['./client-user-groups.component.scss'],
})
export class ClientUserGroupsComponent implements OnInit {

  @Input() id: any;
  @Input() edit: any;
  add: boolean;
  private  addGroupName: string;

  public clientUserGroup: any;
  public loader: boolean;

  constructor(
    private getDetailService: GetDetailsService,
    private postDetailService: PostDetailsService,
    private deleteServicesService : DeleteServicesService,
  ) { }

  ngOnInit() {
    this.getuserGroups();
    this.loader = false;
  }

  getuserGroups() {
    let data;
    return this.getDetailService.getClientUserGroups(this.id)
      .subscribe(res => {
        console.log('get user groups', res);
        this.clientUserGroup = res.groups;
      }, err => {
        console.log(err);
      }
      )
  }

  // add client user group
  addUserGroup(group){
    const reqBody = {
      name: group.name
    };
    let clientId = this.id;
    console.log('nameeeeee', reqBody);
    return this.postDetailService.addClientUserGroup(clientId,reqBody)
    .subscribe(res =>{
      console.log('add group response', res);
      console.log('res group',res.group)
      // this.clientUserGroup.unhift({name: ''});
      this.clientUserGroup[this.clientUserGroup.length-1]= res.group;
      // this.clientUserGroup.push(res.group);
    }, err => {
      console.log(err);
    }

    )
     
  }
  // add client user group
  editUserGroup(group){
    const reqBody = {
      name: group.name
    };
    let clientId = this.id;
    let groupId = group._id;
    console.log('nameeeeee', name);
    console.log('group id', groupId);
    return this.postDetailService.updateClientUserGroup(clientId,groupId,reqBody)
    .subscribe(res =>{
      console.log('Update group response', res);
      this.getuserGroups();
    }, err => {
      console.log(err);
    }

    )
  }

  // delete client user group
  deleteUserGroup(group){
    // let name = group.name;
    let clientId = this.id;
    let groupId = group._id;
    console.log('nameeeeee', name);
    console.log('group id', groupId);
    return this.deleteServicesService.deleteClientUserGroups(clientId,groupId)
    .subscribe(res =>{
      console.log('delete group response', res);
      // this.getuserGroups();
      this.clientUserGroup = this.clientUserGroup.filter(val=>{if(val._id!=groupId) return val});
    }, err => {
      console.log(err);
    }

    )
  }


  // add group user row
  addContactRow(){
    this.add = true;
    this.clientUserGroup.push({name: ''});
  }

}
