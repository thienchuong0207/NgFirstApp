import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptionsArgs, Response } from "@angular/http";
import { environment as env } from "src/environments/environment";
import { Observable } from "rxjs";
import { StorageService, LOCAL_STORAGE, isStorageAvailable } from 'angular-webstorage-service';
import { Constants } from "../util/Constants";

/**
 * Auth Service
 */
@Injectable()
export class AuthService {

    constructor(private http: Http,
        @Inject(LOCAL_STORAGE) private storageService: StorageService) {}

    /**
     * Authenticate
     * @param username
     * @param password 
     */
    public authenticate(username: string, password: string): Observable<Response> {
        let url: string = `${env.backEndApi.url}/auth`;
        let body: object = {
            username: username,
            password: password
        }
        let headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options: RequestOptionsArgs = {
            headers: headers
        };
        return this.http.post(url, JSON.stringify(body), options);
    }

    /**
     * Check whether User has Signed-in or not
     */
    public hasSignedIn(): boolean {
        let result: boolean = false;
        if (isStorageAvailable(localStorage) && this.storageService.get(Constants.SIGNIN.STORAGE_KEY) != null) {
            result = true;
        }
        return result;
    }

    /**
     * Sign-out of Application
     */
    public signOut(): boolean {
        let result: boolean = false;
        if (isStorageAvailable(localStorage) && this.storageService.get(Constants.SIGNIN.STORAGE_KEY) != null) {
            this.storageService.remove(Constants.SIGNIN.STORAGE_KEY);
            result = true;
        }
        return result;
    } 
}