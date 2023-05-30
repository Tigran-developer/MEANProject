import {Action} from "@ngrx/store";

import {CustomerModel} from "../customer.model";
import {EntityState, Update} from "@ngrx/entity";

export interface CustomerState extends EntityState<CustomerModel>{
  selectedCustomerId:string ;
  loading: boolean,
  loaded: boolean,
  error: string
}

export enum CustomerActionTypes {
  LOAD_CUSTOMERS = "[Customer] Load Customers",
  LOAD_CUSTOMERS_SUCCESS = "[Customer] Load Customers Success",
  LOAD_CUSTOMERS_FAIL = "[Customers] Load Customers Fail",

  LOAD_CUSTOMER = "[Customer] Load Customer",
  LOAD_CUSTOMER_SUCCESS = "[Customer] Load Customer Success",
  LOAD_CUSTOMER_FAIL = "[Customers] Load Customer Fail",

  CREATE_CUSTOMER = "[Customer] Creat Customer",
  CREATE_CUSTOMER_SUCCESS = "[Customer] Creat Customer Success",
  CREATE_CUSTOMER_FAIL = "[Customers] Creat Customer Fail",

  UPDATE_CUSTOMER = "[Customer] Update Customer",
  UPDATE_CUSTOMER_SUCCESS = "[Customer] Update Customer Success",
  UPDATE_CUSTOMER_FAIL = "[Customers] Update Customer Fail",

  DELETE_CUSTOMER = "[Customer] Delete Customer",
  DELETE_CUSTOMER_SUCCESS = "[Customer] Delete Customer Success",
  DELETE_CUSTOMER_FAIL = "[Customers] Delete Customer Fail"
}

export class LoadCustomers implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS
}
export class LoadCustomersSuccess implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS

  constructor(public payload: CustomerModel[] ) {
  }
}
export class LoadCustomersFail implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS_FAIL

  constructor(public payload: string) {
  }
}

export class LoadCustomer implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER

  constructor(public payload: string) {
  }
}
export class LoadCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER_SUCCESS

  constructor(public payload: CustomerModel ) {
  }
}
export class LoadCustomerFail implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER_FAIL

  constructor(public payload: string) {
  }
}

export class CreateCustomer implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER

  constructor( public payload: CustomerModel) {
  }
}
export class CreateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER_SUCCESS

  constructor(public payload: CustomerModel) {
  }
}
export class CreateCustomerFail implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER_FAIL

  constructor(public payload: string) {
  }
}

export class UpdateCustomer implements Action {
  readonly type = CustomerActionTypes.UPDATE_CUSTOMER

  constructor( public payload: CustomerModel) {
  }
}
export class UpdateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS

  constructor(public payload: Update<CustomerModel>) {
  }
}
export class UpdateCustomerFail implements Action {
  readonly type = CustomerActionTypes.UPDATE_CUSTOMER_FAIL

  constructor(public payload: string) {
  }
}

export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER

  constructor( public payload: string) {
  }
}
export class DeleteCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_SUCCESS

  constructor(public payload: string) {
  }
}
export class DeleteCustomerFail implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_FAIL

  constructor(public payload: string) {
  }
}

export type Actions = LoadCustomers | LoadCustomersSuccess | LoadCustomersFail |
  LoadCustomer | LoadCustomerSuccess | LoadCustomerFail |
  CreateCustomer | CreateCustomerSuccess | CreateCustomerFail |
  UpdateCustomer | UpdateCustomerSuccess | UpdateCustomerFail |
  DeleteCustomer | DeleteCustomerSuccess | DeleteCustomerFail;
