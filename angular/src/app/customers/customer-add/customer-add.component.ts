import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store"
import {Observable,tap} from "rxjs";

import {CustomerModel} from "../customer.model"
import {MembershipModel} from "../../membership/membership.model";

import * as customerActions from "../state/customer.action"
import * as membershipActions from "../../membership/state/membership.action";
import * as fromCustomer from "../state/customer.reducer"
import * as fromMemberships from "../../membership/state/membership.reducer";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerAddComponent implements OnInit {
  customerForm!:FormGroup;
  customers$: Observable<MembershipModel[]> | undefined;
  memberships$!: Observable<MembershipModel[]>;
  error$: Observable<String>| undefined;

  constructor(private fb: FormBuilder,
              private store: Store<fromCustomer.AppState>) {
  }

  ngOnInit(): void {
    this.loadMemberships()
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required]
    })
  }

  createCustomer() {
    const newCustomer: CustomerModel = {
      name: this.customerForm?.get("name")?.value,
      phone: this.customerForm?.get("phone")?.value,
      address: this.customerForm?.get("address")?.value,
      membership: this.customerForm?.get("membership")?.value
    }
    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));
    this.customerForm?.reset();
  }

  loadMemberships(){
    this.memberships$ = this.store.pipe(select(fromMemberships.getMemberships),
      tap(memberships => {
        if (!memberships) {
          this.store.dispatch(new membershipActions.LoadMemberships);
        }
      }))
  }
}
