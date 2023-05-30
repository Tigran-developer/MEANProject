import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {createFeatureSelector, createSelector} from "@ngrx/store";

import {MembershipActions, MembershipState} from "./membership.action";
import {MembershipModel} from "../membership.model";

import * as membershipAction from "./membership.action";

export const defaultMembership: { loaded: boolean; entities: {}; loading: boolean; error: string; selectedMembershipId: number } = {
  entities: {},
  selectedMembershipId: NaN,
  loading: false,
  loaded: true,
  error: ""
}

export const membershipAdapter: EntityAdapter<MembershipModel> = createEntityAdapter<MembershipModel>({
  selectId: (membership: MembershipModel) => membership._id || ''
})

export const initialState = membershipAdapter.getInitialState(defaultMembership);

export function membershipReducer(
  state = initialState,
  action: MembershipActions) {
  switch (action.type) {
    case membershipAction.MembershipAction.LOAD_MEMBERSHIP : {
      return {
        ...state,
        loading: true
      }
    }
    case membershipAction.MembershipAction.LOAD_MEMBERSHIPS_SUCCESS : {
      return membershipAdapter.addMany(action.payload,
        {
          ...state,
          loading: false,
          loaded: true
        })
    }
    case membershipAction.MembershipAction.LOAD_MEMBERSHIPS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      }
    }
    case membershipAction.MembershipAction.LOAD_MEMBERSHIP_SUCCESS: {
      return membershipAdapter.addOne(action.payload,
        {
          ...state,
          selectedMembershipId: action.payload._id
        })
    }
    case membershipAction.MembershipAction.LOAD_MEMBERSHIP_FAIL: {
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
const getMembershipFeatureState = createFeatureSelector<MembershipState>(
  "memberships"
)

export const getMembershipsLoading = createSelector(
  getMembershipFeatureState,
  (state: MembershipState) => state.loading,
)
export const getMemberships = createSelector(
  getMembershipFeatureState,
  membershipAdapter.getSelectors().selectAll
)

export const getMembershipById = (membershipId: string) => createSelector(
  getMemberships,
  memberships => memberships.find(
    membership => membership._id === membershipId)
)

export const getMembershipLoaded = createSelector(
  getMembershipFeatureState,
  (state: MembershipState) => state.loaded,
)
export const getError = createSelector(
  getMembershipFeatureState,
  (state: MembershipState) => state.error,
)
export const getCurrentMembershipID = createSelector(
  getMembershipFeatureState,
  (state: MembershipState) => state.selectedMembershipId
)
export const getCurrentMembership = createSelector(
  getMembershipFeatureState,
  getCurrentMembershipID,
  state=>state.entities[state.selectedMembershipId]
)

