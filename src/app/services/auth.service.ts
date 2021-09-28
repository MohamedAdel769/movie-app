import {EventEmitter, Injectable} from "@angular/core";
import {SessionDetails, User} from "../models/user.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService{
  users: User[] = [
    new User("mo@gmail.com", "123456"),
    new User("test@gmail.com", "aaaaaa"),
    new User("t@gmail.com", "asd1234")
  ];

  sessionEvent = new Subject<SessionDetails>();
  currSession = new SessionDetails(false, new User('',''));

  logIn(newUser: User) : boolean{
    const uIndex = this.users.findIndex( ({ email }) => email === newUser.email );

    if(uIndex !== -1 && this.users[uIndex].password === newUser.password){
      this.currSession = new SessionDetails(true, newUser);
      this.sessionEvent.next(this.currSession);
      localStorage.setItem('userData', JSON.stringify(newUser));
      return true;
    }
    else{
      return false;
    }
  }

  autoLogIn(){
    const userData: {
      email: string;
      password: string;
    } = JSON.parse(<string>localStorage.getItem('userData'));
    if(!userData)
      return;

    const loadedUser = new User(userData.email, userData.password);
    this.currSession = new SessionDetails(true, loadedUser);
    this.sessionEvent.next(this.currSession);
  }

  logOut(){
    this.sessionEvent.next(new SessionDetails(false, new User('', '') ) );
    this.currSession = new SessionDetails(false, new User('',''));
    localStorage.removeItem('userData');
  }
}