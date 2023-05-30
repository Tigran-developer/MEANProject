import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, of, Subject, takeUntil,tap} from 'rxjs';

import {CustomerModel} from '../customer.model';
import {MembershipModel} from "../../membership/membership.model";

import * as customerActions from '../state/customer.action';
import * as membershipActions from "../../membership/state/membership.action";
import * as fromCustomer from '../state/customer.reducer';
import * as fromMemberships from '../../membership/state/membership.reducer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnChanges {
  customerForm!: FormGroup;
  memberships$: Observable<MembershipModel[]> = of();
  ngUnsubscribe = new Subject();

  @Input() editCustomerId!: string;

  constructor(private fb: FormBuilder,
              private store: Store<fromCustomer.AppState>) {
    this.customerForm = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membershipId: ["", Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editCustomerId'].previousValue !== changes['editCustomerId'].currentValue) {
     this.store.pipe(
        select(fromCustomer.getCustomerById(changes['editCustomerId'].currentValue)),
      )
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((customer: { _id: any; name: any; phone: any; address: any; membership: any; }) => {
          this.customerForm.controls['id'].setValue(customer?._id);
          this.customerForm.controls['name'].setValue(customer?.name);
          this.customerForm.controls['phone'].setValue(customer?.phone);
          this.customerForm.controls['address'].setValue(customer?.address);
          this.customerForm.controls['membershipId'].setValue(customer?.membership);
        });
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
    // @ts-ignore
    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
    this.customerForm.reset();
  }

  // loadMembership(membershipId: string | undefined): Observable<MembershipModel | undefined> {
  //   if (!membershipId) throw Error;
  //   return this.store.pipe(
  //     select(fromMembership.getMembershipById(membershipId)),
  //     tap(membership => {
  //       if (!membership) {
  //         this.store.dispatch(new membershipActions.LoadMembership(membershipId));
  //       }
  //     })
  //   )
  // }

  loadMemberships() {
    this.memberships$ = this.store.pipe(select(fromMemberships.getMemberships),
      tap((memberships: MembershipModel) => {
        if (!memberships) {
          // @ts-ignore
          this.store.dispatch(new membershipActions.LoadMemberships);
        }
      }))
  };

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
