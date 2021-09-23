import { Component, OnInit } from '@angular/core';
import {ErrorHandlingService} from "./error-handling.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {
  loginError: boolean = false;
  movie404: boolean = false;
  loginSuccess: boolean = false;

  constructor(private errorHandleService: ErrorHandlingService,
              private router: Router) {
    this.errorHandleService.loginErrorFired.subscribe(() => this.setLoginError());
    this.errorHandleService.movie404Fired.subscribe(() => this.setMovieNotFound());
    this.errorHandleService.loginSuccessFired.subscribe(() => this.setLoginSuccess());
  }

  ngOnInit(): void {
  }

  setLoginError(){
    this.loginError = true;
    setTimeout(() => {this.loginError = false}, 2000);
  }

  setMovieNotFound(){
    this.movie404 = true;
    setTimeout(() => {
      this.movie404 = false;
      this.router.navigate(['/catalog']);
      }, 2000);
  }

  setLoginSuccess(){
    this.loginSuccess = true;
    setTimeout(() => {this.loginSuccess = false}, 2000);
  }
}
