export class LoggingService {
    /* Write normal info to console */
    public info(message: string): void {
        console.log('%c' + message, 'color: green');
    }
    /* Write error-related info to console */
    public error(message: string): void {
        console.log('%c' + message, 'color: red');
    }
}