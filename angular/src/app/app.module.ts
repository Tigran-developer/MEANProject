import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
