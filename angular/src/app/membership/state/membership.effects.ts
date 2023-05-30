import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";

import {of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import * as  membershipActions from "../state/membership.action"
import {MembershipModel} from "../membership.model";
import {MembershipService} from "../membership.service";


@Injectable()
export class MembershipEffects {

  constructor(private actions$: Actions,
              private membershipService: MembershipService) {
  }

  public loadMemberships$ = createEffect(() => this.actions$.pipe(
    ofType<membershipActions.LoadMemberships>(
      membershipActions.MembershipAction.LOAD_MEMBERSHIPS
    ),
    mergeMap((actions: membershipActions.LoadMemberships) => {
        return this.membershipService.getMemberships().pipe(
          map(
            (memberships: MembershipModel[]): Action => new membershipActions.LoadMembershipsSuccess(memberships),
            catchError(err => of(new membershipActions.LoadMembershipFail(err)))
          )
        );
      }
    )
  ));


  public loadMembership$ = createEffect(() => this.actions$.pipe(
    ofType<membershipActions.LoadMembership>(
      membershipActions.MembershipAction.LOAD_MEMBERSHIP
    ),
    mergeMap((action: membershipActions.LoadMembership) => {
        return this.membershipService.getMembershipById(action.payload).pipe(
          map(
            (membership: MembershipModel): Action => new membershipActions.LoadMembershipSuccess(membership),
            catchError(err => {
              console.log(err)
              return of(new membershipActions.LoadMembershipFail(err))
            })
          )
        );
      }
    )
  ));
}
