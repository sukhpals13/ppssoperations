import { Component, OnInit, Input, NgZone, Output, EventEmitter } from '@angular/core';
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
  public tempContact: any;
  public editIndex: any;
  public editing: boolean;

  @Output() editingPage = new EventEmitter();


  constructor(
    public PoseDetailService: PostDetailsService,
    public DeleteDetailService: DeleteServicesService,
  ) { }

  ngOnInit() {
    this.loader = false;
    this.actionVisible = true;
    this.add = true;
    this.editIndex = null;
  }
  addContactsInfo(contact) {
    let clientId = this.id;
    let reqBody = {
      contactType: contact.contactType,
      contactName: contact.contactName,
      contactPhone: contact.contactPhone,
      contactEmail: contact.contactEmail,
      contactNotes: contact.contactNotes,
    }
    // let reqBody = this.clientContactDetails;
    console.log('Edit client detail', this.clientContactDetails);
    return this.PoseDetailService.addClientContact(clientId, reqBody)
      .subscribe(res => {
        this.add = true;
        console.log('Client add detail responseres', res);
        this.clientContactDetails = res.client.contacts.map(val => {
          let obj = { ...val };
          obj.edit = false;
          return obj
        });
        console.log(this.clientContactDetails)
        this.editIndex = null;
        this.editing = false;
        this.editingPage.emit()
        // this.actionVisible = true;
      }, err => {
        this.add = false;
        console.log(err);
      })
  }

  editContactsInfo(contact) {
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
    console.log('Edit client detail', reqBody);
    return this.PoseDetailService.updateClientContact(clientId, reqBody)
      .subscribe(res => {
        this.add = true;
        console.log('Client add detail responseres', res);
        this.clientContactDetails = res.client.contacts.map(val => {
          let obj = { ...val }
          obj.edit = false;
          return obj;
        });
        this.editIndex = null;
        this.editing = false;
        // this.clientContactDetails.pop();
        this.editingPage.emit()
      }, err => {
        this.add = false;
        console.log(err);
      })
  }

  addRemoveContactRow() {
    this.add = !this.add;
    if(this.editIndex==null){
      this.editIndex = this.clientContactDetails.length;
      this.editing = true;
      this.clientContactDetails.push({ contactType: '', contactName: '', contactPhone: '', contactEmail: '', contactNotes: '', edit: true });
      this.editingPage.emit()
    }else{
      this.editIndex = null;
      this.editing = false;
      this.clientContactDetails.pop();
      this.editingPage.emit()
    }
  }

  deleteContact(contact) {
    let contactId = contact._id;
    let clientId = this.id;
    return this.DeleteDetailService.deleteClientContact(clientId, contactId)
      .subscribe(res => {
        console.log('delete client contact', res);
        this.clientContactDetails = res.client.contacts;
        this.editIndex = null;
        this.editing = false;
        // this.clientContactDetails.pop();
        this.editingPage.emit()
      }, err => {
        console.log(err);
      })
  }

  editContact(contact,i) {
    if(this.editIndex==null){
      this.editIndex = i
      this.editing = true;
      this.editingPage.emit()
    }else{
      this.editIndex = null;
      this.editing = false;
      this.editingPage.emit()
    }
    contact.edit = !contact.edit;
    console.log(i);
    // this.editingPage.emit();
    // this.storedContact
    if(contact.edit==true){
      this.tempContact = JSON.parse(JSON.stringify(this.clientContactDetails));
    }else{
      contact = Object.assign(contact,this.tempContact[i]);
      contact.edit = false;
    }
  }

}
