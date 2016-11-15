var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", 'aurelia-http-client', 'aurelia-framework', 'parse'], function (require, exports, aurelia_http_client_1, aurelia_framework_1) {
    "use strict";
    var Parse = require('parse');
    var App = (function () {
        function App() {
            Parse.initialize("be_id");
            Parse.serverURL = 'http://localhost:1337/parse';
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'NY Test';
            config.map([
                { route: '', title: 'Home', moduleId: 'home' }
            ]);
            this.router = router;
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
            this.genders = [
                { gender: 'male', count: 5 },
                { gender: 'female', count: 8 },
                { gender: 'something', count: 3 },
            ];
            this.httpClient = httpClient;
        }
        Home.prototype.activate = function (params) {
            this.loadUsers();
        };
        Home.prototype.loadUsers = function () {
            var _this = this;
            var query = new Parse.Query(Parse.User);
            query.find({
                success: function (users) {
                    _this.userCount = users.length;
                    _this.drawChart();
                    console.log(users);
                }
            });
        };
        Home.prototype.drawChart = function () {
            var chart = c3.generate({
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
            .standardConfiguration()
            .feature('resources');
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

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <div class=\"container\">\n    <section class=\"hero is-dark is-bold\">\n      <div class=\"hero-body\">\n        <div class=\"container\">\n          <h1 class=\"title\">\n            New Yorker - App Test\n          </h1>\n          <h2 class=\"subtitle\">\n            Gender diversion\n          </h2>\n        </div>\n      </div>\n    </section>\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "section {\r\n    margin-bottom: 40px;\r\n}"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n  \r\n  <h2 class=\"title is-2\">There are ${userCount} users registered.</h2>\r\n  \r\n  <table class=\"table is-striped\">\r\n  <thead>\r\n    <tr>\r\n      <th>Gender</th>\r\n      <th>Number of registered users</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr repeat.for=\"gender of genders\">\r\n      <td>${gender.gender}</td>\r\n      <td>${gender.count}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n\r\n<div id=\"chart\"></div>\r\n  \r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map