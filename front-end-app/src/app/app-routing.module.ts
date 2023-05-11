import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegComponent} from "./reg/reg.component";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {isLoggedGuard} from "./isLogged.guard";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'reg', component: RegComponent},
  {path:'auth', component: AuthComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [isLoggedGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
