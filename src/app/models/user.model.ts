export class User{
  constructor(public email: string, public password: string) {}
}

export class SessionDetails{
  constructor(public isLoggedIn: boolean, public currUser: User, public jwt: string) {}
}

export interface jwt_json{
  jwt: string;
}
