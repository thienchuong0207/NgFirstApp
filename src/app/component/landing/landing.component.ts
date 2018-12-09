import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';

/**
 * Landing-Page Component
 */
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class LandingComponent implements AfterViewInit {

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

    ngAfterViewInit() {
        this.router.navigate([{outlets: {landingRouterOutlet: 'home'}}], {relativeTo: this.activatedRoute});
    }

    /**
     * Sign-out of Application
     */
    public OnSignOut() {
        if (this.authService.hasSignedIn()) {
            if (this.authService.signOut()) {
                this.router.navigate(['/signin'], {relativeTo: this.activatedRoute});
            }
        }
    }
}