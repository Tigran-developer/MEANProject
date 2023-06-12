import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, of, Subject, take, tap} from 'rxjs';

import {CustomerModel} from '../customer.model';
import {MembershipModel} from "../../membership/membership.model";

import * as customerActions from '../state/customer.action';
import * as membershipActions from "../../membership/state/membership.action";
import * as fromCustomer from '../state/customer.reducer';
import * as fromMemberships from '../../membership/state/membership.reducer';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerListComponent} from "../customer-list/customer-list.component";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit, OnChanges {
  customerForm!: FormGroup;
  memberships$: Observable<MembershipModel[]> = of();
  ngUnsubscribe = new Subject();
  editCustomerId!: string;

  constructor(private fb: FormBuilder,
              private store: Store<fromCustomer.AppState>,
              public dialogRef: MatDialogRef<CustomerListComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.editCustomerId = data.customerId;
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membershipId: ["", Validators.required],
    })
    this.loadCustomer(this.editCustomerId);
    this.loadMemberships();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editCustomerId'].previousValue !== changes['editCustomerId'].currentValue) {
      this.loadCustomer(changes['editCustomerId'].currentValue);
      this.loadMemberships();
    }
  }

  updateCustomer() {
    const updatedCustomer: CustomerModel = {
      _id: this.customerForm?.get('id')?.value,
      name: this.customerForm?.get('name')?.value,
      phone: this.customerForm?.get('phone')?.value,
      address: this.customerForm?.get('address')?.value,
      membership: this.customerForm?.get('membershipId')?.value,
    }
    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
    this.customerForm.reset();
    this.dialogRef.close();
  }

  loadCustomer(customerId: string) {
    this.store.pipe(
      select(fromCustomer.getCustomerById(customerId)),
    )
      .pipe(take(1))
      .subscribe((customer) => {
        this.customerForm.controls['id'].setValue(customer?._id);
        this.customerForm.controls['name'].setValue(customer?.name);
        this.customerForm.controls['phone'].setValue(customer?.phone);
        this.customerForm.controls['address'].setValue(customer?.address);
        this.customerForm.controls['membershipId'].setValue(customer?.membership);
      });
  };

  loadMemberships() {
    this.memberships$ = this.store.pipe(select(fromMemberships.getMemberships),
      tap((memberships: MembershipModel[]) => {
        if (!memberships) {
          this.store.dispatch(new membershipActions.LoadMemberships);
        }
      }))
  };

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
