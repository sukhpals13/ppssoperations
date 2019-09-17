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

  constructor(
    public dialogRef: MatDialogRef<OrderFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
    ]
    this.subStatusTypeArray = [
      'Approved',
      'Awaiting Approval',
      'Needs Picked',
      'Not Approved',
      'Payment Error',
    ]
  }
}
