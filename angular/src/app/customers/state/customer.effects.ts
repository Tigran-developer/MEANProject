import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {catchError, map, mergeMap,of} from "rxjs";

import {CustomerService} from "../customer.service"
import {CustomerModel} from "../customer.model"
import * as customerActions from "../state/customer.action"


@Injectable()
export class CustomerEffect {

  constructor(private actions$: Actions,
              private customerService: CustomerService) {
  }

  public loadCustomers$ = createEffect(() => this.actions$.pipe(
    ofType<customerActions.LoadCustomers>(
      customerActions.CustomerActionTypes.LOAD_CUSTOMERS
    ),
    mergeMap((actions: customerActions.LoadCustomers) => {
        return this.customerService.getCustomers().pipe(
          map(
            (customers: CustomerModel[]): Action => new customerActions.LoadCustomersSuccess(customers),
            catchError(err => of(new customerActions.LoadCustomersFail(err)))
          )
        );
      }
    )
  ));

  public loadCustomer$ = createEffect(() => this.actions$.pipe(
    ofType<customerActions.LoadCustomer>(
      customerActions.CustomerActionTypes.LOAD_CUSTOMER
    ),
    mergeMap((action: customerActions.LoadCustomer) => {
        return this.customerService.getCustomerById(action.payload).pipe(
          map(
            (customer: CustomerModel): Action => new customerActions.LoadCustomerSuccess(customer),
            catchError(err => of(new customerActions.LoadCustomerFail(err)))
          )
        );
      }
    )
  ));

  public createCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<customerActions.CreateCustomer>(
        customerActions.CustomerActionTypes.CREATE_CUSTOMER
      ),
      map((action: customerActions.CreateCustomer) => action.payload),
      mergeMap((customer: CustomerModel) =>
        this.customerService.createCustomer(customer).pipe(
          map(
            (newCustomer: CustomerModel) =>
              new customerActions.CreateCustomerSuccess(newCustomer),
            catchError(err => {
              return of(new customerActions.CreateCustomerFail(err));
            })),
        ),
      ));
  });

  public updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<customerActions.UpdateCustomer>(
        customerActions.CustomerActionTypes.UPDATE_CUSTOMER
      ),
      map((action: customerActions.UpdateCustomer) => action.payload),
      mergeMap((customer: CustomerModel) => {
        return this.customerService.updateCustomer(customer).pipe(
          map((updateCustomer: CustomerModel) => new customerActions.UpdateCustomerSuccess({
              id: updateCustomer._id || 'noId',
              changes: updateCustomer
            }),
            catchError(err => {
              return of(new customerActions.UpdateCustomerFail(err));
            })
          )
        )}
      )
    );
  });

  public deleteCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<customerActions.DeleteCustomer>(
        customerActions.CustomerActionTypes.DELETE_CUSTOMER
      ),
      map((action: customerActions.DeleteCustomer) => action.payload),
      mergeMap((id: string) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() =>
              new customerActions.DeleteCustomerSuccess(id),
            catchError(err => {
              return of(new customerActions.DeleteCustomerFail(err));
            })),
        ),
      ));
  });
}
