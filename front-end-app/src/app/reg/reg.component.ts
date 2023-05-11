import {Component, OnInit} from '@angular/core';
import {CheckFormService} from "../check-form.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name = '';
  login = '';
  email = '';
  password = ''

  constructor(private checkForm: CheckFormService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  userRegister() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    }
    if (!this.checkForm.checkName(user.name)) {
      this.flashMessage.show('Username is incorrect', {
        cssClass: 'alert-danger',
        timeout: 4000
      })
      return false;
    }
    else if (!this.checkForm.checkLogin(user.login)) {
      this.flashMessage.show('Login is incorrect', {
        cssClass: 'alert-danger',
        timeout: 4000
      })
      return false;
    }
    else if (!this.checkForm.checkEmail(user.email)) {
      this.flashMessage.show('Email is incorrect', {
        cssClass: 'alert-danger',
        timeout: 4000
      })
      return false;
    }
    else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessage.show('Password is incorrect', {
        cssClass: 'alert-danger',
        timeout: 4000
      })
      return false;
    }

    this.authService.registerUser(user).subscribe(
      (data:any)=>{
      if(!data['success']){
       this.flashMessage.show(data.msg,{
         cssClass: 'alert-danger',
         timeout:2000
       })
        this.router.navigate(['/reg']).then(r => {})
      }
      else {
        this.flashMessage.show(data.msg,{
          cssClass: 'alert-success',
          timeout:2000
        })
        this.router.navigate(['/auth']).then(r => {})
      }
    })
    return true;
  }
}
