import {RouterConfiguration, Router, Redirect, NavigationInstruction, Next} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import 'parse';
const Parse = require('parse')

@inject(HttpClient)
export class App {

  public router;
  public currentUser;

  constructor() {
    Parse.initialize("newYorkerApi"); 
    Parse.serverURL = 'https://appdev.newyorker.de/newyorkerapitest'
  }


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

  configureRouter(config, router){
    config.title = 'NY Test';
    config.addPipelineStep('authorize', this.authorizeStep);
    config.map([
      { route: '',      title: 'Home',    moduleId: 'home', settings: {auth: true} },
      { route: 'login', title: 'Login',   moduleId: 'login'  }
    ]);

    this.router = router;
  }
}

