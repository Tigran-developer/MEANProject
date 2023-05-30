import * as customerAction from "./customer.action"
import {CustomerState} from "./customer.action"
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {CustomerModel} from "../customer.model";

export interface AppState {
  customer: CustomerState
}

export const defaultCustomer: { loaded: boolean; entities: {}; loading: boolean; error: string; selectedCustomerId: string } = {
  entities: {},
  selectedCustomerId:'NaN',
  loading: false,
  loaded: true,
  error:""
}

export const customerAdapter: EntityAdapter<CustomerModel> = createEntityAdapter<CustomerModel>({
  selectId: (customer: CustomerModel) => customer._id || Math.random().toString()
})

export const initialState = customerAdapter.getInitialState(defaultCustomer)

export function customerReducer(
  state = initialState,
  action: customerAction.Actions
): CustomerState {
  switch (action.type) {
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      }
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addMany(action.payload,
        {
          ...state,
          loading: false,
          loaded:true
        })
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      }
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return <CustomerState>customerAdapter.addOne(action.payload,
        {
          ...state,
          selectedCustomerId: action.payload._id
        })
    }
    case customerAction.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case customerAction.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state)
    }
    case customerAction.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case customerAction.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state)
    }
    case customerAction.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case customerAction.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state)
    }
    case customerAction.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    default: {
      return {...state}
    }
  }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  "customers"
)

export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
)
export const getCustomerById =(customerId: string)=> createSelector(
  getCustomers,
  customers => customers.find(
    customer => customer._id === customerId)
)
export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error,
)
export const getCurrentCustomerID = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
)
export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerID,
  state=>state.entities[state.selectedCustomerId]
)
// export const getCustomersLoading = createSelector(
//   getCustomerFeatureState,
//   (state: CustomerState) => state.loading,
// )
// export const getCustomerLoaded = createSelector(
//   getCustomerFeatureState,
//   (state: CustomerState) => state.loaded,
// )

