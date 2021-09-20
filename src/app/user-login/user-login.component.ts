import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ErrorHandlingService} from "../error-handling/error-handling.service";
import {SessionDetails, User} from "../shared/user.model";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  hide = true;
  @ViewChild('f') loginForm! : NgForm;
  isLoggedIn: boolean = false;
  currentUser: User = new User('','');

  constructor(private authService: AuthService, private errorHandleService: ErrorHandlingService) {
    this.authService.sessionEvent.subscribe((sessionData: SessionDetails) =>
    {
      this.isLoggedIn = sessionData.isLoggedIn;
      this.currentUser = sessionData.currUser;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authService.logIn(new User(this.loginForm.value.email, this.loginForm.value.password))) {
      console.log('success');
      console.log(this.currentUser);
      this.loginForm.resetForm();
    }
    else{
      this.errorHandleService.loginErrorFired.emit();
    }
  }
}
