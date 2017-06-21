"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var account_service_1 = require("./account.service");
var UserService = (function () {
    function UserService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
    }
    UserService.prototype.list = function () {
        var options = { withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");
        return this.http
            .get(url, options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().portalUsers; })
            .toPromise();
    };
    UserService.prototype.detail = function (userId) {
        var options = { withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            userId,
        ].join("/");
        return this.http
            .get(url, options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().portalUser; })
            .toPromise();
    };
    UserService.prototype.create = function (user) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");
        return this.http
            .post(url, JSON.stringify(user), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().portalUser; })
            .toPromise();
    };
    UserService.prototype.update = function (user) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");
        return this.http
            .put(url, JSON.stringify(user), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().portalUser; })
            .toPromise();
    };
    UserService.prototype.updatePassword = function (user, oldPassword, password) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "password",
        ].join("/");
        return this.http
            .put(url, JSON.stringify({ oldPassword: oldPassword, password: password }), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().portalUser; })
            .toPromise();
    };
    UserService.prototype.remove = function (user) {
        var options = { withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");
        return this.http
            .delete(url, options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .toPromise();
    };
    UserService.prototype.sendInvite = function (user) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = { headers: headers, withCredentials: true };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "send-invite",
        ].join("/");
        return this.http
            .post(url, JSON.stringify(user), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .toPromise();
    };
    UserService.decorators = [
        { type: core_1.Injectable },
    ];
    UserService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map