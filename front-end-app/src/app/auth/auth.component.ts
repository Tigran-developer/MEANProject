import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service'
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login = '';
  password = '';

  constructor(private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  userLogin() {
    const user = {
      login: this.login,
      password: this.password
    }
    if (this.login.trim() == '') {
      this.flashMessage.show("Enter Login", {
        cssClass: 'alert-danger',
        timeout: 2000
      })
    }
    if (this.password.trim() == '') {
      this.flashMessage.show("Enter Password", {
        cssClass: 'alert-danger',
        timeout: 2000
      })
    } else {

      this.authService.authUser(user).subscribe((data: any) => {
        if (!data['success']) {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 2000
          })
        } else {
          this.flashMessage.show('Successfully logged in', {
            cssClass: 'alert-success',
            timeout: 2000
          })

          this.router.navigate(['/dashboard']).then(r => {
          })
          this.authService.storeUser(data.token, data.user)
        }
      })
    }
  }
}
