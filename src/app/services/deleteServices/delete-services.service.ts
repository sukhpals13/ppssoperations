import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../default';

@Injectable({
  providedIn: 'root'
})
export class DeleteServicesService {

  constructor(
    public http: HttpClient
  ) { }

  deleteAssignment(clientId, assignment) {
    let url = config.hostName+"/api/client/assignment/" + clientId;
    return this.http.request<any>('delete', url, { body: { name: assignment } })
  }

  deleteRank(clientId, rank) {
    let url = config.hostName+"/api/client/rank/" + clientId;
    return this.http.request<any>('delete', url, { body: { name: rank } })
  }

  deletePickupLocation(clientId, pickupLocation) {
    let url = config.hostName+"/api/client/pickupLocation/" + clientId;
    return this.http.request<any>('delete', url, { body: { name: pickupLocation } })
  }

  deleteDeliveryLocation(clientId, deliveryLocation) {
    let url = config.hostName+"/api/client/deliveryLocation/" + clientId;
    return this.http.request<any>('delete', url, { body: { name: deliveryLocation } })
  }

  deleteClientContact(clientId, contactId) {
    let url = config.hostName+"/api/client/contact/" + clientId;
    return this.http.request<any>('delete', url, { body: { contactId: contactId } })
  }

  deleteClientUserRole(clientId, role_id) {
    let url = config.hostName+"/api/client/clientUserRoles/" + clientId + "/" + role_id;
    return this.http.request<any>('delete', url)
  }

  // delete client user group 
  deleteClientUserGroups(clientId, groupId) {
    let url = config.hostName+"/api/client/clientUserGroups/" + clientId + '/' + groupId;
    return this.http.request<any>('delete', url)
  }

}
