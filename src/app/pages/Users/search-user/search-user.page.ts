import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';
import { GetDetailsService } from '../../../services/getDetails/get-details.service';
import { UsersListModel } from '../../../interfaces/user';
// import { GetDetailsService } from '../../../getDetails/get-details.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {

  users: UsersListModel;
  searchText: string;
  searchSubmitted: boolean;

  constructor(
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private getDetailsService: GetDetailsService,
    public menu: MenuController,

  ) { }

  @HostBinding('class.is-shell') get isShell() {
    return (this.users && this.users.isShell) ? true : false;
  }

  ngOnInit() {
    this.users = {
      name: null,
      UserNumber: null,
      users: [],
      isShell: true,
      
    };
    this.searchSubmitted = false;
    // this.initializeData();
    // this.getClientList();
  }

  initializeData(){
    this.users.users = [];
    var i =0;
    while(i<6){
      var obj = {
        name: null,
        UserNumber: null,
        isShell: true
      };
      this.users.users.push(obj);
      i++;
    }
  }

  getUsersList(phrase){
    this.initializeData();
    this.getDetailsService.getAllUsers(phrase).subscribe(res =>
      {
        this.searchSubmitted = true;
        this.users = res;
      console.log('Users:',res);
    },
    (err)=>{
      this.users.users = [];
      console.log(err);
    }
    
    )
  }

  // viewUserDetails(u){
  //   this.navCtrl.navigateForward('/clients/details/'+u._id);
  // }

  ionViewDidEnter(){
    // this.searchText = '';
    // this.getClientList('');
  }

}
