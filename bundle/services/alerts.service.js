"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Alert_1 = require("../models/Alert");
var account_service_1 = require("./account.service");
var AlertsService = (function () {
    function AlertsService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this._lastRefresh = 0;
        console.log("new AlertsService()", arguments);
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
        this._observable = Observable_1.Observable
            .create(function (observer) { return _this._observer = observer; })
            .do(function (a) { return _this._alerts = a; })
            .multicast(new BehaviorSubject_1.BehaviorSubject(this._alerts))
            .refCount();
    }
    AlertsService.prototype.cleanup = function () {
        this._alerts = [];
    };
    Object.defineProperty(AlertsService.prototype, "Observable", {
        get: function () {
            var _this = this;
            this.refresh().catch(function (err) { return _this._observer.error(err); });
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    AlertsService.prototype.refresh = function () {
        var _this = this;
        if (this._lastRefresh > Date.now() - 5000) {
            return Promise.resolve(this._alerts);
        }
        this._lastRefresh = Date.now();
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "alerts",
        ].join("/");
        return this.http
            .get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().alerts.map(function (a) { return new Alert_1.Alert(a); }); })
            .do(function (a) {
            if (_this._observer) {
                _this._observer.next(a);
            }
            else {
                _this._alerts = a;
            }
        })
            .toPromise();
    };
    AlertsService.prototype.add = function (alert) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "alerts",
        ].join("/");
        return this.http
            .post(url, JSON.stringify(alert), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .do(function () { return _this.refresh(); })
            .toPromise();
    };
    AlertsService.prototype.remove = function (alert) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "alerts",
            alert.id,
        ].join("/");
        return this.http
            .delete(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function () { return true; })
            .do(function () { return _this.refresh(); })
            .toPromise();
    };
    AlertsService.decorators = [
        { type: core_1.Injectable },
    ];
    AlertsService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return AlertsService;
}());
exports.AlertsService = AlertsService;
//# sourceMappingURL=alerts.service.js.map