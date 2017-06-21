"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var session_service_1 = require("./session.service");
var Developer_1 = require("../models/Developer");
var AccountService = (function () {
    function AccountService(http, session) {
        var _this = this;
        this.http = http;
        this.session = session;
        this._lastRefresh = 0;
        console.log("new AccountService()", http, session);
        this.session.Observable
            .first(function (s) { return !!s; })
            .subscribe(function (s) {
            _this._developer = new Developer_1.Developer(s.developer);
            if (_this._observer) {
                _this._observer.next(_this._developer);
            }
        });
    }
    AccountService.prototype.cleanup = function () {
        console.log("AccountService cleanup");
        if (this._observer) {
            this._observer.complete();
        }
        delete this._developer;
    };
    Object.defineProperty(AccountService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable_1.Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .do(function (dev) { return _this._developer = dev; })
                    .multicast(new BehaviorSubject_1.BehaviorSubject(this._developer))
                    .refCount();
            }
            this.refreshDeveloper().catch(function (err) { return console.error("Developer not ready yet.", err); });
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    AccountService.prototype.refreshDeveloper = function () {
        var _this = this;
        if (!this._developer) {
            return Promise.reject(new Error("No Developer found."));
        }
        if (this._lastRefresh > Date.now() - 500) {
            return Promise.resolve(this._developer);
        }
        this._lastRefresh = Date.now();
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return new Developer_1.Developer(resp.json().developer); })
            .do(function (dev) { if (_this._observer) {
            _this._observer.next(dev);
        } })
            .toPromise();
    };
    AccountService.prototype.update = function (dev) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
        ].join("/");
        return this.http.put(url, JSON.stringify(dev), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return new Developer_1.Developer(res.json().developer); })
            .do(function (d) {
            if (_this._observer) {
                _this._observer.next(d);
            }
            _this.session.refresh();
        })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .toPromise();
    };
    AccountService.prototype.updatePassword = function (password, newPassword) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "passwords",
            encodeURIComponent(password),
        ].join("/");
        return this.http.put(url, JSON.stringify({ password: password, newPassword: newPassword }), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .do(function () { return _this.session.refresh(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(function () { return true; })
            .toPromise();
    };
    AccountService.prototype.deleteAccount = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = [
                API_BASE_URL,
                "developers",
                encodeURIComponent(id),
            ].join("/");
            _this.http.delete(url, { withCredentials: true })
                .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
                .do(function () { return _this.session.refresh(); })
                .subscribe(function () { return resolve(true); }, function (err) { return reject(err); });
        });
    };
    AccountService.decorators = [
        { type: core_1.Injectable },
    ];
    AccountService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: session_service_1.SessionService, decorators: [{ type: core_1.Inject, args: [session_service_1.SessionService,] },] },
    ]; };
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map