"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var user_1 = require("./user");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.url = "http://ebola.agency/frontend-task.php?page=1&per_page=";
    }
    UserService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.url)
            .map(function (res) { return res.json().count; })
            .flatMap(function (count) { return _this.http.get("" + _this.url + count).map(_this.extractProducts)
            .catch(_this.handleError); });
    };
    UserService.prototype.extractProducts = function (response) {
        var res = response.json().data;
        var products = [];
        for (var i = 0; i < res.length; i++) {
            products.push(new user_1.User(res[i].id, res[i].first_name, res[i].last_name, res[i].patronymic_name, res[i].discount));
        }
        return products;
    };
    UserService.prototype.handleError = function (error, cought) {
        var message = "";
        if (error instanceof http_1.Response) {
            var errorData = error.json().error || JSON.stringify(error.json());
            message = error.status + " - " + (error.statusText || '') + " " + errorData;
        }
        else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        return Observable_1.Observable.throw(message);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map