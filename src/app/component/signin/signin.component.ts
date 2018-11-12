import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';

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

    private username: string = null;
    private password: string = null;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

    /**
     * Sign-In
     */
    public onSignIn():void {
        let isValidUser: boolean = this.authService.authenticateUser(this.username, this.password);
        if (isValidUser) {
            this.router.navigate(['../landing'], {relativeTo: this.activatedRoute});
        } else {
            this.username = '';
            this.password = '';
        }
    }
}