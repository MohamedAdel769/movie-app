import {EventEmitter} from "@angular/core";
import {SessionDetails, User} from "../shared/user.model";


export class AuthService{
  users: User[] = [
    new User("mo@gmail.com", "123456"),
    new User("test@gmail.com", "aaaaaa"),
    new User("t@gmail.com", "asd1234")
  ];

  sessionEvent = new EventEmitter<SessionDetails>();

  logIn(newUser: User) : boolean{
    const uIndex = this.users.findIndex( ({ email }) => email === newUser.email );

    if(uIndex !== -1 && this.users[uIndex].password === newUser.password){
      this.sessionEvent.emit(new SessionDetails(true, newUser));
      return true;
    }
    else{
      return false;
    }
  }

  // TODO: add autoLogin feature

  // autoLogIn(){
  //   const userData: {
  //     email: string;
  //     password: string;
  //   } = JSON.parse(<string>localStorage.getItem('userData'));
  //   if(!userData)
  //     return;
  //
  //   const loadedUser = new User(userData.email, userData.password);
  //   this.sessionEvent.emit({isLoggedIn: true, currentUser: loadedUser});
  // }

  logOut(){
    this.sessionEvent.emit(new SessionDetails(false, new User('', '') ) );
  }
}
