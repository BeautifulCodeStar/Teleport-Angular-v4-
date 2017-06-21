"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var account_service_1 = require("./account.service");
var AccountCredentialsService = (function () {
    function AccountCredentialsService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
    }
    AccountCredentialsService.prototype.cleanup = function () {
        delete this._developer;
    };
    AccountCredentialsService.prototype.list = function (userId) {
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().basicAuthPasswords; })
            .map(function (p) { return p.map(function (p2) { return ({ userName: userId, password: p2 }); }); })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    AccountCredentialsService.prototype.create = function (userId) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
        ].join("/");
        return this.http.post(url, "", { headers: headers, withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().basicAuthPasswords; })
            .map(function (p) { return p.map(function (p2) { return ({ userName: userId, password: p2 }); }); })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    AccountCredentialsService.prototype.remove = function (userId, password) {
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "credentials",
            encodeURIComponent(password),
        ].join("/");
        return this.http.delete(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().basicAuthPasswords; })
            .map(function (p) { return p.map(function (p2) { return ({ userName: userId, password: p2 }); }); })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    AccountCredentialsService.decorators = [
        { type: core_1.Injectable },
    ];
    AccountCredentialsService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return AccountCredentialsService;
}());
exports.AccountCredentialsService = AccountCredentialsService;
//# sourceMappingURL=account.credentials.service.js.map