import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";

import {map, Observable} from "rxjs";

import {MembershipModel} from "./membership.model";

@Injectable({
  providedIn: "root"
})
export class MembershipService {
  constructor(private http: HttpClient) {
  }

  private membershipUrl = "http://localhost:3000/membership";

  public getMemberships(): Observable<MembershipModel[]> {
    return this.http.get<MembershipModel[]>(this.membershipUrl);
  }

  public getMembershipById(id: string): Observable<MembershipModel> {
    return this.http.get<MembershipModel>(`${this.membershipUrl}/${id}`).pipe(
      map(response => response as MembershipModel)
    );
  }

  // getCustomerById(payload: number): Observable<CustomerModel> {
  //   return this.http.get<CustomerModel>(`${this.customersUrl}/${payload}`);
  // }
  //
  // createCustomer(payload: CustomerModel): Observable<CustomerModel> {
  //   return this.http.post<CustomerModel>(this.customersUrl, payload);
  // }
  //
  // updateCustomer(customer: CustomerModel): Observable<CustomerModel> {
  //   return this.http.patch<CustomerModel>(
  //     `${this.customersUrl}/${customer._id}`,
  //     customer
  //   );
  // }
  //
  // deleteCustomer(payload: number) {
  //   return this.http.delete(`${this.customersUrl}/${payload}`);
  // }
}
