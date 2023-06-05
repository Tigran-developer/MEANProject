import {Component, EventEmitter, OnInit, Output, Signal} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map, Observable, switchMap, tap, zip} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {CustomerEditComponent} from "../customer-edit/customer-edit.component";
import {CustomerModel} from "../customer.model";
import {MembershipModel} from "../../membership/membership.model";

import * as custerActions from "../state/customer.action";
import * as membershipActions from "../../membership/state/membership.action";
import * as fromCustomer from "../state/customer.reducer";
import * as fromMembership from "../../membership/state/membership.reducer"


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<CustomerModel[]> | any;
  customer: Signal<CustomerModel[]> | any;
  error$: Observable<String> | undefined;
  dialogConfig = new MatDialogConfig();

  @Output() selectedCustomer = new EventEmitter();

  constructor(private store: Store<fromCustomer.AppState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCustomersList();
  }

  getCustomersList() {
    this.store.dispatch(new custerActions.LoadCustomers());
    this.customers$ = this.store.pipe(
      select(fromCustomer.getCustomers),
      switchMap(customers =>
        zip(
          customers.map(customer =>
            this.getMembership(customer.membership).pipe(
              map(membership => ({
                ...customer,
                membershipName: membership?.name || 'Unknown Name'
              }))
            )
          )
        )
      )
    );

    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }

  getMembership(membershipId: string): Observable<MembershipModel| undefined> {
    return  this.store.pipe(
      select(fromMembership.getMembershipById(membershipId)),
      tap(membership => {
        if (!membership) {
          this.store.dispatch(new membershipActions.LoadMembership(membershipId));
        }
      })
    )
  }

  onEdit(customerId: string) {
    const dialogRef = this.dialog.open(CustomerEditComponent,{
      data:{customerId: customerId},
      height: '350px',
      width: '400px',
    });
  }

  deleteCustomer(customerId: string) {
    if (confirm("Are You Sure You Want To Delete this User?")) {
      this.store.dispatch(new custerActions.DeleteCustomer(customerId||'noId'));
    }
  }
}
