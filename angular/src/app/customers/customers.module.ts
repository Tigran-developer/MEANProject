import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from "@ngrx/effects";
import {CustomerEffect} from "./state/customer.effects";
import {CustomerComponent} from './customer/customer.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {customerReducer} from "./state/customer.reducer"
import {ReactiveFormsModule} from '@angular/forms';
import {MembershipModule} from "../membership/membership.module";
import {MatDialogModule} from "@angular/material/dialog";


const customerRoutes: Routes = [
    {path: "", component: CustomerComponent},
    {path: 'edit/:id', component: CustomerComponent }
  ];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature("customers", customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
    ReactiveFormsModule,
    MembershipModule,
    MatDialogModule
  ],
  providers:[
  ]
})
export class CustomersModule {
}
