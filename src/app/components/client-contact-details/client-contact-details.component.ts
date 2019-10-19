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
  public actionVisible: boolean;
  public add: boolean;
  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // public editCon: boolean;

  constructor(
    public PoseDetailService: PostDetailsService,
    public DeleteDetailService: DeleteServicesService,
  ) { }

  ngOnInit() {
    this.loader=false;
    this.actionVisible = true;
    this.add = true;
  }
  addContactsInfo(contact){
     let clientId = this.id;
     let reqBody = {
      contactType: contact.contactType,
      contactName: contact.contactName,
      contactPhone: contact.contactPhone,
      contactEmail: contact.contactEmail,
      contactNotes: contact.contactNotes,
     }
    // let reqBody = this.clientContactDetails;
     console.log('Edit client detail',this.clientContactDetails);
     return this.PoseDetailService.addClientContact(clientId,reqBody)
     .subscribe(res => {
      this.add = true;
      console.log('Client add detail responseres', res);
      this.clientContactDetails = res.client.contacts.map(val=>{
        let obj = {...val};
        obj.edit = false;
      });
      // this.actionVisible = true;
    }, err => {
      this.add = false;
      console.log(err);
    })
  }

  editContactsInfo(contact){
    let clientId = this.id;
    let reqBody = {
      _id: contact._id,
     contactType: contact.contactType,
     contactName: contact.contactName,
     contactPhone: contact.contactPhone,
     contactEmail: contact.contactEmail,
     contactNotes: contact.contactNotes,
    }
   // let reqBody = this.clientContactDetails;
    console.log('Edit client detail',reqBody);
    return this.PoseDetailService.updateClientContact(clientId,reqBody)
    .subscribe(res => {
      this.add = true;
     console.log('Client add detail responseres', res);
     this.clientContactDetails = res.client.contacts.map(val=>{
       let obj = {...val}
       obj.edit = false;
       return obj;
     });
   }, err => {
    this.add = false;
     console.log(err);
   })
 }

  addContactRow(){
    // this.actionVisible = false;
    this.add = false;
    // console.log('function call');
    //  this.contacts
    this.clientContactDetails.push({contactType: '', contactName: '', contactPhone: '', contactEmail: '', contactNotes: '', edit: true })
     
  }

    deleteContact(contact){
      let contactId = contact._id;
      let clientId = this.id;
      return this.DeleteDetailService.deleteClientContact(clientId,contactId)
       .subscribe(res => {
        console.log('delete client contact', res);
        this.clientContactDetails = res.client.contacts;

      }, err => {
        console.log(err);
      })
    }

    editContact(contact){
      contact.edit = !contact.edit;
      // this.storedContact
    }

}
