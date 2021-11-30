import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {SessionDetails} from "../models/user.model";


@Injectable({providedIn: "root"})
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.sessionEvent.subscribe((sessionData: SessionDetails) =>
    {
      this.isLoggedIn = sessionData.isLoggedIn;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean |
    UrlTree> |
    boolean | UrlTree
  {
    if(this.authService.getSessionData())
      return true;
    else
      return this.router.createUrlTree(['/login']);
  }

}
