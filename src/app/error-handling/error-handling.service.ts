import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class ErrorHandlingService{
  loginError = false;
  loginErrorFired = new EventEmitter();

  isLoginError(){
    return this.loginError;
  }

}
