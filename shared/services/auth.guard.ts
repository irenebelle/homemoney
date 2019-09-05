import { CanActivateChild, Router, RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authSevcice:AuthService, private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>| Promise<boolean> | boolean{
        if(this.authSevcice.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            });
            return false;
        }
    }
    canActivateChild(childroute: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childroute, state);

    }

}