import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { AuthService } from "../service/AuthService";

/**
 * Auth Guard
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Can Activate Route or Not
     * @param activatedRouteSnapshot
     * @param routerStateSnapshot 
     */
    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
        routerStateSnapshot: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.hasSignedIn()) {
            return true;
        } else {
            this.router.navigate(['/signin']);
            return false;
        }
    }
}