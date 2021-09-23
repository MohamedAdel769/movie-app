import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ErrorHandlingService} from "../error-handling/error-handling.service";
import {SessionDetails, User} from "../shared/user.model";
import {Route, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  hide = true;
  @ViewChild('f') loginForm! : NgForm;
  isLoggedIn: boolean = false;
  currentUser: User = new User('','');
  sessionSub: Subscription;

  constructor(private authService: AuthService, private errorHandleService: ErrorHandlingService,
              private router: Router) {
    this.sessionSub = this.authService.sessionEvent.subscribe((sessionData: SessionDetails) => {
      this.isLoggedIn = sessionData.isLoggedIn;
      this.currentUser = sessionData.currUser;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.currSession.isLoggedIn;
    this.currentUser = this.authService.currSession.currUser;
  }

  onSubmit(){
    if(this.authService.logIn(new User(this.loginForm.value.email, this.loginForm.value.password))) {
      this.loginForm.resetForm();
      this.errorHandleService.loginSuccessFired.emit();
      this.router.navigate(['/']);

    }
    else{
      this.errorHandleService.loginErrorFired.emit();
    }
  }

  ngOnDestroy(): void {
    this.sessionSub.unsubscribe();
  }
}
