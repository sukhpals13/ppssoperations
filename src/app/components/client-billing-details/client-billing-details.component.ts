import { Component, OnInit, Input } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service'

@Component({
  selector: 'app-client-billing-details',
  templateUrl: './client-billing-details.component.html',
  styleUrls: ['./client-billing-details.component.scss'],
})
export class ClientBillingDetailsComponent implements OnInit {
  @Input()  data: any;
  @Input()  edit: boolean;
  @Input()  id: boolean;
  public loader: boolean;

  constructor(
    private postDetails: PostDetailsService
  ) {
    console.log('myCustomComponent');
   }

  ngOnInit() {
    console.log(this.data);
    console.log(this.edit);
    this.loader=false;
  }
  editInfoCalled() {
    console.log(this.data,this.id)
    this.loader = true;
    this.postDetails.updateBillingInfo(this.id,this.data)
    .subscribe(res=>{
      console.log(res);
      this.loader = false;
      // this.data = res.client.billingInfo;
      // console.log(this.data);
    }, err=>{
      this.loader = false;
      console.log(err);
    })
  }
}
