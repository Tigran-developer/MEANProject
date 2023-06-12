import {Action} from "@ngrx/store";
import {MembershipModel} from "../membership.model";
import {EntityState} from "@ngrx/entity";
import {CustomerModel} from "../../customers/customer.model";

export interface MembershipState extends EntityState<MembershipModel>{
  selectedMembershipId:number
  loading: boolean,
  loaded: boolean,
  error: string
}

export enum MembershipAction {
  LOAD_MEMBERSHIPS = "[Membership] Load Memberships",
  LOAD_MEMBERSHIPS_SUCCESS = "[Membership] Load Memberships Success",
  LOAD_MEMBERSHIPS_FAIL = "[Membership] Load Memberships Fail",

  LOAD_MEMBERSHIP = "[Membership] Load Membership",
  LOAD_MEMBERSHIP_SUCCESS = "[Membership] Load Membership Success",
  LOAD_MEMBERSHIP_FAIL = "[Membership] Load Membership Fail",
}

export class LoadMemberships implements Action {
  readonly type = MembershipAction.LOAD_MEMBERSHIPS
}
export class LoadMembershipsSuccess implements Action {
  readonly type = MembershipAction.LOAD_MEMBERSHIPS_SUCCESS

  constructor(public payload: MembershipModel[] ) {
  }
}
export class LoadMembershipsFail implements Action {
  readonly type = MembershipAction.LOAD_MEMBERSHIPS_FAIL

  constructor(public payload: string) {
  }
}
export class LoadMembership implements Action {
  readonly type = MembershipAction.LOAD_MEMBERSHIP

  constructor(public payload: string) {
  }
}
export class LoadMembershipSuccess implements Action {
  readonly type = MembershipAction.LOAD_MEMBERSHIP_SUCCESS

  constructor(public payload: MembershipModel) {
  }
}
export class LoadMembershipFail implements Action {
  readonly type = MembershipAction.LOAD_MEMBERSHIP_FAIL

  constructor(public payload: string) {
  }
}

export type  MembershipActions =
  LoadMemberships|LoadMembershipsSuccess|LoadMembershipsFail|
  LoadMembership|LoadMembershipSuccess|LoadMembershipFail;
