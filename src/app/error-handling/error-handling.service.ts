import {EventEmitter} from "@angular/core";

export class ErrorHandlingService{
  loginError = false;
  loginErrorFired = new EventEmitter();

  isLoginError(){
    return this.loginError;
  }

}
