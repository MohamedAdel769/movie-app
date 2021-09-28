import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class ErrorHandlingService{
  loginErrorFired = new EventEmitter();
  movie404Fired = new EventEmitter();
  loginSuccessFired = new EventEmitter();
}
