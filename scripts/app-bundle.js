var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", 'aurelia-router', 'aurelia-http-client', 'aurelia-framework', 'parse'], function (require, exports, aurelia_router_1, aurelia_http_client_1, aurelia_framework_1) {
    "use strict";
    var Parse = require('parse');
    var App = (function () {
        function App() {
            var _this = this;
            this.authorizeStep = {
                run: function (navigationInstruction, next) {
                    if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.settings.auth; })) {
                        var user = Parse.User.current();
                        if (!user) {
                            return next.cancel(new aurelia_router_1.Redirect('login'));
                        }
                        _this.currentUser = user;
                    }
                    return next();
                }
            };
            Parse.initialize("newYorkerApi");
            Parse.serverURL = 'https://appdev.newyorker.de/newyorkerapitest';
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'NY Test';
            config.addPipelineStep('authorize', this.authorizeStep);
            config.map([
                { route: '', title: 'Home', moduleId: 'home', settings: { auth: true } },
                { route: 'login', title: 'Login', moduleId: 'login' }
            ]);
            this.router = router;
        };
        App.prototype.logout = function () {
            Parse.User.logOut();
            this.currentUser = null;
            this.router.navigate('login');
        };
        App = __decorate([
            aurelia_framework_1.inject(aurelia_http_client_1.HttpClient), 
            __metadata('design:paramtypes', [])
        ], App);
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('home',["require", "exports", 'aurelia-framework', 'aurelia-http-client', 'c3', 'parse'], function (require, exports, aurelia_framework_1, aurelia_http_client_1) {
    "use strict";
    var Parse = require('parse');
    var c3 = require('c3');
    var Home = (function () {
        function Home(httpClient) {
            this.httpClient = httpClient;
            this.userCount = 0;
            this.genders = [];
            this.httpClient = httpClient;
        }
        Home.prototype.activate = function (params) {
            this.loadUsers();
        };
        Home.prototype.loadUsers = function () {
            var _this = this;
            var CustomerProfile = Parse.Object.extend("CustomerProfile");
            var query = new Parse.Query(CustomerProfile);
            query.find({
                success: function (profiles) {
                    _this.userCount = profiles.length;
                    _this.createGenderList(profiles);
                    _this.drawChart();
                }
            });
        };
        Home.prototype.createGenderList = function (profiles) {
            var _loop_1 = function(profile) {
                var sex = profile.get('sex');
                if (sex == undefined) {
                    sex = 'Not defined';
                }
                var genderCount = this_1.genders.find(function (it) { return it.gender == sex; });
                if (!genderCount) {
                    genderCount = { gender: sex, count: 0 };
                    this_1.genders.push(genderCount);
                }
                genderCount.count++;
            };
            var this_1 = this;
            for (var _i = 0, profiles_1 = profiles; _i < profiles_1.length; _i++) {
                var profile = profiles_1[_i];
                _loop_1(profile);
            }
        };
        Home.prototype.drawChart = function () {
            c3.generate({
                bindto: '#chart',
                data: {
                    type: 'pie',
                    columns: this.createChartData()
                }
            });
        };
        Home.prototype.createChartData = function () {
            var data = [];
            for (var _i = 0, _a = this.genders; _i < _a.length; _i++) {
                var gender = _a[_i];
                data.push([gender.gender, gender.count]);
            }
            return data;
        };
        Home = __decorate([
            aurelia_framework_1.inject(aurelia_http_client_1.HttpClient), 
            __metadata('design:paramtypes', [aurelia_http_client_1.HttpClient])
        ], Home);
        return Home;
    }());
    exports.Home = Home;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('login',["require", "exports", 'aurelia-framework', 'aurelia-router', 'parse'], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    var Parse = require('parse');
    var Login = (function () {
        function Login(router) {
            this.router = router;
        }
        Login.prototype.login = function () {
            var _this = this;
            this.clearError();
            Parse.User.logIn(this.username, this.password, {
                success: function (user) {
                    _this.router.navigate('');
                },
                error: function (user, error) {
                    _this.errorMsg = error.message;
                }
            });
        };
        Login.prototype.clearError = function () {
            this.errorMsg = null;
        };
        Login = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router), 
            __metadata('design:paramtypes', [aurelia_router_1.Router])
        ], Login);
        return Login;
    }());
    exports.Login = Login;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration();
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./app.css\"></require>\r\n  <div>\r\n\r\n    <section class=\"hero is-dark is-bold\">\r\n      <div class=\"hero-body\">\r\n        <div class=\"container\">\r\n          <h1 class=\"title is-1\">\r\n            New Yorker - App Test\r\n          </h1>\r\n          <h2 class=\"subtitle\">\r\n            Gender diversion\r\n          </h2>\r\n        </div>\r\n      </div>\r\n    </section>\r\n\r\n    <nav if.bind=\"currentUser\" class=\"nav has-shaddow\">\r\n      <div class=\"nav-right nav-menu\">\r\n        <div class=\"nav-item\">\r\n          <i class=\"fa fa-user\" aria-hidden=\"true\"></i> You are logged in as '${currentUser.get('username')}'\r\n        </div>\r\n        <a class=\"nav-item\" href=\"#\" click.delegate=\"logout()\">\r\n          <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> Log Out\r\n        </a>\r\n      </div>\r\n    </nav>\r\n\r\n    <div class=\"content\">\r\n      <router-view></router-view>\r\n    </div>\r\n\r\n  </div>\r\n</template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "body{\r\n    background-color: #ffffff;\r\n    padding-bottom: 50px;\r\n}\r\n\r\n.content {\r\n        padding-left: 10px;\r\n    padding-right: 10px;\r\n}\r\n\r\nnav {\r\n    margin-bottom: 40px;\r\n    padding-left: 20px;\r\n    padding-right: 20px;\r\n}"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n  \r\n  <h2 class=\"title is-2\">There are ${userCount} users registered.</h2>\r\n  \r\n  <table class=\"table is-striped\">\r\n  <thead>\r\n    <tr>\r\n      <th>Gender</th>\r\n      <th>Number of registered users</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr repeat.for=\"gender of genders\">\r\n      <td>${gender.gender}</td>\r\n      <td>${gender.count}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n\r\n<div id=\"chart\"></div>\r\n  \r\n</template>"; });
define('text!login.html', ['module'], function(module) { module.exports = "<template>\r\n    <section class=\"hero\">\r\n        <div class=\"hero-body\">\r\n            <div class=\"container\">\r\n                <h1 class=\"title\">\r\n                    Login\r\n                </h1>\r\n                <h2 class=\"subtitle\">\r\n                    Welcome. Please enter your Email address and your password.\r\n                </h2>\r\n            </div>\r\n        </div>\r\n    </section>\r\n\r\n    <div class=\"columns\">\r\n        <div class=\"column is-6 is-offset-3\">\r\n            <form class=\"\">\r\n                <p class=\"control has-icon\">\r\n                    <input value.bind=\"username\" class=\"input\" type=\"email\" placeholder=\"Email\">\r\n                    <i class=\"fa fa-envelope\"></i>\r\n                </p>\r\n                <p class=\"control has-icon\">\r\n                    <input value.bind=\"password\" class=\"input\" type=\"password\" placeholder=\"Password\">\r\n                    <i class=\"fa fa-lock\"></i>\r\n                </p>\r\n                <p class=\"control\">\r\n                    <button click.delegate=\"login()\" class=\"button is-medium is-pulled-right\">\r\n                        Login\r\n                    </button>\r\n                </p>\r\n            </form>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"columns\">\r\n        <div class=\"column is-6 is-offset-3\">\r\n            <div if.bind=\"errorMsg\" class=\"notification is-danger\">\r\n                <button click.delegate=\"clearError()\" class=\"delete\"></button> ${errorMsg}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map