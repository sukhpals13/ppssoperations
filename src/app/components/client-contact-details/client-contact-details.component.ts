import { Component, OnInit, Input, NgZone } from '@angular/core';
import { PostDetailsService } from '../../services/postDetails/post-details.service';
import { DeleteServicesService } from '../../services/deleteServices/delete-services.service';

@Component({
  selector: 'app-client-contact-details',
  templateUrl: './client-contact-details.component.html',
  styleUrls: ['./client-contact-details.component.scss'],
})
export class ClientContactDetailsComponent implements OnInit {

  @Input() clientContactDetails: any;
  @Input() edit: any;
  @Input() id: any;
  public loader: boolean;
  public panelOpenState = false;
  public contacts = [];

  constructor(
    public PoseDetailService: PostDetailsService,
    public DeleteDetailService: DeleteServicesService,
  ) { }

  ngOnInit() {
    this.loader=false;
    console.log('data contacts',this.clientContactDetails);
  }
  editContactsInfo(){
     let cliendID = this.id;
     let reqBody = {
      contactType: this.clientContactDetails.contactType,
      contactName: this.clientContactDetails.contactName,
      contactPhone: this.clientContactDetails.contactPhone,
      contactEmail: this.clientContactDetails.contactEmail,
      contactNotes: this.clientContactDetails.contactNotes,
     }
    // let reqBody = this.clientContactDetails;
     console.log('Edit client detail',this.clientContactDetails);
     return this.PoseDetailService.updateClientContact(cliendID,reqBody)
     .subscribe(res => {
      console.log('Client add detail responseres', res);
    }, err => {
      console.log(err);
    })
  }

  addContactRow(){
    console.log('function call');
    //  this.contacts
    this.clientContactDetails.push({contactType: '', contactName: '', contactPhone: '', contactEmail: '', contactNotes: '', created: '', updated: '' })
     
    }

    deleteContact(contact){
      let contactId = contact._id;
       return this.DeleteDetailService.deleteClientContact(contactId)
       .subscribe(res => {
        console.log('delete client contact', res);
      }, err => {
        console.log(err);
      })
    }

}
