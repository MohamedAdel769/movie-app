import {Component, OnInit} from '@angular/core';
import {AuthService} from "./user-login/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogIn();
  }

}
