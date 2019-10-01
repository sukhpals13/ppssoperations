import { Component, OnInit, Input } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-client-customizations',
  templateUrl: './client-customizations.component.html',
  styleUrls: ['./client-customizations.component.scss'],
})
export class ClientCustomizationsComponent implements OnInit {

  @Input() clientCustomizations: any;
  @Input() edit: any;
  @Input() id: any;

  public loader: boolean;

  constructor(
    private postDetails: PostDetailsService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
     this.loader=false;
  }

}
