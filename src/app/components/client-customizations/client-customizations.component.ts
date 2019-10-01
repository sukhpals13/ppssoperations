import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-client-customizations',
  templateUrl: './client-customizations.component.html',
  styleUrls: ['./client-customizations.component.scss'],
})
export class ClientCustomizationsComponent implements OnInit {

  @Input() clientCustomizations: any;
  @Input() edit: any;
  @Input() id: any;

  constructor() { }

  ngOnInit() {}

}
