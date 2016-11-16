import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'parse';

const Parse = require('parse')

/* 
 * The Login-Page. 
 */
@inject(Router)
export class Login {
    public username: string;
    public password: string;
    public errorMsg: string;

    constructor (private router:Router){}

    /* Perfroms a login with the given username/email
     * If the login is unsuccessful an error-message will be shown.
     */
    login() {
        this.clearError();
        Parse.User.logIn(this.username, this.password, {
            success: (user) => {
                this.router.navigate('');
            },
            error: (user, error) => {
                this.errorMsg = error.message;
            }
        });
    }

    /* clears the error-message */
    clearError() {
        this.errorMsg = null;
    }
}