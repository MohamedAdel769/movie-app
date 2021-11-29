import {EventEmitter, Injectable} from "@angular/core";
import {jwt_json, SessionDetails, User} from "../models/user.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable({providedIn: "root"})
export class AuthService{
  apiBaseUrl: string = environment.apiBaseUrl;
  sessionEvent = new Subject<SessionDetails>();
  currSession = new SessionDetails(false, new User('',''), '');

  constructor(private http: HttpClient) {
  }

  sendLoginReq(newUser: User) {
    return this.http.post<jwt_json>(`${this.apiBaseUrl}/login`, newUser);
  }

  logIn(newUser: User) : boolean{
    let jwt = null;

    this.sendLoginReq(newUser).subscribe(
      value => {
          console.log(value.jwt);
          jwt = value.jwt;
          this.currSession = new SessionDetails(true, newUser, jwt);
          this.sessionEvent.next(this.currSession);
          localStorage.setItem('userData', JSON.stringify(this.currSession));
        }, error => {
          jwt = "";
      }
    );

    return (jwt !== "");
  }

  autoLogIn(){
    const sessionData: {
      isLoggedIn: boolean;
      currUser: User;
      jwt: string;
    } = JSON.parse(<string>localStorage.getItem('userData'));
    if(!sessionData)
      return;

    this.sessionEvent.next(sessionData);
  }

  logOut(){
    this.currSession = new SessionDetails(false, new User('',''), '');
    this.sessionEvent.next(this.currSession);
    localStorage.removeItem('userData');
  }
}
