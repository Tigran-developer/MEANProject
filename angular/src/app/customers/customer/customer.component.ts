import {Component} from '@angular/core';
import {CustomerEditComponent} from "../customer-edit/customer-edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  selectedCustomerId!:string;

  constructor(private dialog: MatDialog) {
  }
  onEdit(customerId: string) {
    const dialogRef = this.dialog.open(CustomerEditComponent,{
      height: '350px',
      width: '250px',
      position: {right:'10px', top: '200px'}
    });
  }
}
