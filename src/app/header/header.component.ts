import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {SessionDetails} from "../models/user.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  sessionSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.sessionSub = this.authService.sessionEvent.subscribe((sessionData: SessionDetails) =>
    {
      this.isLoggedIn = sessionData.isLoggedIn;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.sessionSub.unsubscribe();
  }

  onNavigate(choice: number){
    if(choice == 1)
      this.router.navigate(['home/movies'], {queryParamsHandling: "preserve"});
    else if(choice == 2)
      this.router.navigate(['home/topRated']);
    else
      this.router.navigate(['home']);
  }
}
