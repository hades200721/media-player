import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private autoService: AuthService) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.autoService.isAuthenticated();
    }

}

