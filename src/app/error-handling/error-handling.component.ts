import { Component, OnInit } from '@angular/core';
import {ErrorHandlingService} from "./error-handling.service";

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {
  loginError: boolean = false;

  constructor(private errorHandleService: ErrorHandlingService) {
    this.errorHandleService.loginErrorFired.subscribe(() => this.setLoginError());
  }

  ngOnInit(): void {
  }

  setLoginError(){
    this.loginError = true;
    setTimeout(() => {this.loginError = false}, 2000);
  }
}
