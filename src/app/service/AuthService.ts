/**
 * Auth Service
 */
export class AuthService {

    private username: string = null;
    private password: string = null;

    /**
     * Check If User Has Signed-In
     */
    public hasSignedIn(): boolean {
        if (this.username != null && this.password != null) {
            return true;
        }
        return false;
    }

    /**
     * Authenticate User
     * @param username
     * @param password 
     */
    public authenticateUser(username: string, password: string): boolean {
        let isValidUser: boolean = false;
        if (username === 'thienchuong0207@gmail.com' && password === 'admin') {
            this.username = username;
            this.password = password;
            isValidUser = true;
        }
        return isValidUser;
    }

    /**
     * Sign Out
     */
    public signOut(): void {
        this.username == null;
        this.password == null;
    }
}