import {RouterConfiguration, Router, Redirect, NavigationInstruction, Next} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import 'parse';
const Parse = require('parse')

/* 
 * The base class of the app this. 
 * Configures the router and initializes the Parse-SDK.
 * Has a reference to the currentUser and can perform a logout. 
 */
@inject(HttpClient)
export class App {

  public router:Router;
  public currentUser;

  constructor() {
    Parse.initialize("newYorkerApi"); 
    Parse.serverURL = 'https://appdev.newyorker.de/newyorkerapitest'
  }


  /* The authorizeStep checks on every route-navigation if the route to display needs authorization. 
   * In authorizations is needed it checks the if there is a currentUser logged in with the parse-server.
   * If no user is logged in, a redirect to the login-page is performed.
   */
  authorizeStep = {
    run: (navigationInstruction: NavigationInstruction, next: Next): Promise<any> => {
      if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
        var user = Parse.User.current();
        if (!user) {
          return next.cancel(new Redirect('login'));
        }
        this.currentUser = user;
      }
      return next();
    }
  };
  
  /* Configures all routes and whether they need authorization */
  configureRouter(config, router){
    config.title = 'NY Test';
    config.addPipelineStep('authorize', this.authorizeStep);
    config.map([
      { route: '',      title: 'Home',    moduleId: 'home', settings: {auth: true} },
      { route: 'login', title: 'Login',   moduleId: 'login'  }
    ]);

    this.router = router;
  }

  /* Logs the currentUser out of the parse-server and redirects to the login-page. */
  logout() {
    Parse.User.logOut();
    this.router.navigate('login')
  }
}

