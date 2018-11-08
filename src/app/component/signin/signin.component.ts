import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Sign-In Page Component
 */
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class SignInComponent {

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    public onSignIn():void {
        this.router.navigate(['../landing'], {relativeTo: this.activatedRoute});
    }
}