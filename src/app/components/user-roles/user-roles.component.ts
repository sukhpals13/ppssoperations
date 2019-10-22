import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostDetailsService } from '../../services/postDetails/post-details.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss'],
})
export class UserRolesComponent implements OnInit {

  @Input() user: any;
  @Input() clientData: any;
  @Input() edit: any;
  @Input() id: any;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public postDetailService: PostDetailsService,
    public zone: NgZone,
  ) { }

  ngOnInit() {}

}
