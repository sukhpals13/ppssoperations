import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {

  // public name: string;
  public client: Object;

  constructor() { }

  ngOnInit() {
    this.client = {
      name:undefined
    }
  }
  ionViewDidEnter(){
    this.client = {
      name:''
    }
  }

}
