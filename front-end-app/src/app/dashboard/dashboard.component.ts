import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) {
  }

  public logoutUser() {
    this.authService.logout();
    this.flashMessage.show("You are exit from your room", {
      cssClass: 'alert-warning',
      timeout: 4000
    })
    this.router.navigate(['auth'])
    return false;
  };
}
