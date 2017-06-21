"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Developer_1 = require("../models/Developer");
var session_service_1 = require("./session.service");
var LoginService = (function () {
    function LoginService(http, session) {
        this.http = http;
        this.session = session;
    }
    LoginService.prototype.register = function (dev) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(API_BASE_URL + "/register", JSON.stringify(dev), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    LoginService.prototype.login = function (userName, password, reCaptchaResponse) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "auth/developers",
            encodeURIComponent(userName),
            encodeURIComponent(password),
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, JSON.stringify({ "g-recaptcha-response": reCaptchaResponse }), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json(); })
            .map(function (res) { return ({
            developer: res.developer ? new Developer_1.Developer(res.developer) : null,
            possibleLogins: res.possibleLogins ? res.possibleLogins : null,
        }); })
            .do(function (res) { if (res.developer) {
            _this.session.refresh();
        } })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    LoginService.prototype.loginAs = function (userName, password, id, authCode) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "auth/developers",
            encodeURIComponent(userName),
            encodeURIComponent(password),
            id,
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, JSON.stringify({ authCode: authCode }), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return new Developer_1.Developer(res.json().developer); })
            .do(function () { return _this.session.refresh(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        var url = [
            API_BASE_URL,
            "auth/developers",
        ].join("/");
        return this.http.delete(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return false; })
            .do(function () { return _this.session.refresh(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    LoginService.prototype.recoverPassword = function (email, reCaptchaResponse) {
        var url = [
            API_BASE_URL,
            "auth/developers/recover",
            encodeURIComponent(email),
        ].join("/");
        var body = {
            "g-recaptcha-response": reCaptchaResponse,
        };
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, JSON.stringify(body), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .toPromise();
    };
    LoginService.prototype.resetPassword = function (email, password, authKey, reCaptchaResponse) {
        var url = [
            API_BASE_URL,
            "auth/developers/reset",
            encodeURIComponent(email),
        ].join("/");
        var body = {
            "g-recaptcha-response": reCaptchaResponse,
            password: password,
            authKey: authKey,
        };
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, JSON.stringify(body), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .toPromise();
    };
    LoginService.decorators = [
        { type: core_1.Injectable },
    ];
    LoginService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: session_service_1.SessionService, decorators: [{ type: core_1.Inject, args: [session_service_1.SessionService,] },] },
    ]; };
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map