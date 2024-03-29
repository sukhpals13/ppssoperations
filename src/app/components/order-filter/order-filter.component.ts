import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss'],
})

export class OrderFilterComponent implements OnInit {
  public statusTypeArray : Array<string>;
  public subStatusTypeArray : Array<string>;
  public object = { status: "",substatus:""}

  constructor(
    public dialogRef: MatDialogRef<OrderFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.object.status = data.status;
    this.object.substatus = data.subStatus;
   }

  onCancelClick(): void {

    this.dialogRef.close();
  }

  ngOnInit() {
    this.statusTypeArray = [
      'Approved',
      'Approval Required',
      'New',
      'Not Approved',
      'On Hold',
      'In Progress'
    ]
    this.subStatusTypeArray = [
      'Approved',
      'Awaiting Approval',
      'Needs Picked',
      'Not Approved',
      'Payment Error',
      'Pick Complete',
      'Pick Suspended'
    ]
  }
}
