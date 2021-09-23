import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../user-login/auth.service";
import {SessionDetails} from "../shared/user.model";
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

  onNavigate(){
    this.router.navigate(['/catalog'], {queryParamsHandling: "preserve"});
  }
}
