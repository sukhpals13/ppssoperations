import { Component, OnInit, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-client-contact-details',
  templateUrl: './client-contact-details.component.html',
  styleUrls: ['./client-contact-details.component.scss'],
})
export class ClientContactDetailsComponent implements OnInit {

  @Input() clientContactDetails: any;
  @Input() edit: any;
  @Input() id: any;

  constructor() { }

  ngOnInit() {}

}
