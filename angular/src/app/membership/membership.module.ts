import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {membershipReducer} from "./state/membership.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ReactiveFormsModule} from "@angular/forms";
import {MembershipEffects} from "./state/membership.effects";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("memberships", membershipReducer),
    EffectsModule.forFeature([MembershipEffects]),
    ReactiveFormsModule
  ]
})
export class MembershipModule { }
