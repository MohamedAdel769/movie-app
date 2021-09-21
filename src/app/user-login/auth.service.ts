import {EventEmitter} from "@angular/core";
import {SessionDetails, User} from "../shared/user.model";


export class AuthService{
  users: User[] = [
    new User("mo@gmail.com", "123456"),
    new User("test@gmail.com", "aaaaaa"),
    new User("t@gmail.com", "asd1234")
  ];

  //TODO: use subject instead
  sessionEvent = new EventEmitter<SessionDetails>();
  currSession = new SessionDetails(false, new User('',''));

  logIn(newUser: User) : boolean{
    const uIndex = this.users.findIndex( ({ email }) => email === newUser.email );

    if(uIndex !== -1 && this.users[uIndex].password === newUser.password){
      this.currSession = new SessionDetails(true, newUser);
      this.sessionEvent.emit(this.currSession);
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
    this.sessionEvent.emit(this.currSession);
  }

  logOut(){
    this.sessionEvent.emit(new SessionDetails(false, new User('', '') ) );
    this.currSession = new SessionDetails(false, new User('',''));
    localStorage.removeItem('userData');
  }
}
