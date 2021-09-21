import { Component, OnInit } from '@angular/core';
import {AuthService} from "../user-login/auth.service";
import {SessionDetails} from "../shared/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.sessionEvent.subscribe((sessionData: SessionDetails) =>
    {
      this.isLoggedIn = sessionData.isLoggedIn;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logOut();
  }
}
