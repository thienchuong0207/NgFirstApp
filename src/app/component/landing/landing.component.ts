import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    ngAfterViewInit() {
        this.router.navigate([{outlets: {landingRouterOutlet: 'home'}}], {relativeTo: this.activatedRoute});
    }
}