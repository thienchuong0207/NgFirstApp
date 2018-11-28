import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';
import { Response } from '@angular/http';
import { LoggingService } from 'src/app/service/LoggingService';
import { StorageService, SESSION_STORAGE, isStorageAvailable } from 'angular-webstorage-service';
import { Constants } from 'src/app/util/Constants';

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
    private hasError: boolean = false;
    private errorMessage: string = '';


    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        @Inject(SESSION_STORAGE) private storageService: StorageService,
        private loggingService: LoggingService) {}

    /**
     * Sign-In
     */
    public onSignIn(): void {
        this.authService.authenticate(this.username, this.password).subscribe(
            (response: Response) => {
                if (response.ok) {
                    if (isStorageAvailable(sessionStorage)) {
                        this.hasError = false;
                        this.errorMessage = '';
                        this.storageService.set(Constants.SIGNIN.STORAGE_KEY, this.username);
                        this.router.navigate(['../landing'], {relativeTo: this.activatedRoute});
                    } else {
                        this.hasError = true;
                        this.errorMessage = 'Lỗi Hệ Thống. Vui Lòng Thử Lại!';
                    }
                }
            }, (error) => {
                if (error instanceof Response && error.status === 401) {
                    this.password = '';
                    this.hasError = true;
                    this.errorMessage = 'Thông Tin Đăng Nhập Không Hợp Lệ!';
                } else {
                    this.loggingService.error(`Error in SignIn: ${error}`);
                }
            }
        );
    }
}