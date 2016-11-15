import {RouterConfiguration, Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import 'parse';
const Parse = require('parse')

@inject(HttpClient)
export class App {

  public router;
  

  constructor() {
    Parse.initialize("be_id"); 
    Parse.serverURL = 'http://localhost:1337/parse'
  }


  configureRouter(config, router){
    config.title = 'NY Test';
    config.map([
      { route: '',          title: 'Home',               moduleId: 'home'   }
    ]);

    this.router = router;
  }
}