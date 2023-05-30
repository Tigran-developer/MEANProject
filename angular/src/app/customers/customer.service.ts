import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { CustomerModel } from "./customer.model";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private customersUrl = "http://localhost:3000/customers";

  public getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.customersUrl);
  }

  getCustomerById(payload: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.customersUrl}/${payload}`);
  }

  createCustomer(payload: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.customersUrl, payload);
  }

  updateCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.patch<CustomerModel>(`${this.customersUrl}/`, customer);
  }

  deleteCustomer(payload: string) {
    return this.http.delete(`${this.customersUrl}/${payload}`);
  }
}
