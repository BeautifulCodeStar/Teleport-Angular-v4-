"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var account_service_1 = require("./account.service");
var TopUpService = (function () {
    function TopUpService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
    }
    Object.defineProperty(TopUpService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable_1.Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .do(function (topUp) { return _this._topUp = topUp; })
                    .multicast(new BehaviorSubject_1.BehaviorSubject(this._topUp))
                    .refCount();
                this.refresh();
            }
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    TopUpService.prototype.refresh = function () {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");
        this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().topUp; })
            .subscribe(function (resp) { return _this._observer.next(resp); }, function (err) { return _this._observer.error(err); });
    };
    TopUpService.prototype.updateTopUp = function (data) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        this.http.post(url, JSON.stringify(data), { headers: headers, withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().topUp; })
            .subscribe(function (resp) { return _this._observer.next(resp); }, function (err) { return _this._observer.error(err); });
    };
    TopUpService.decorators = [
        { type: core_1.Injectable },
    ];
    TopUpService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return TopUpService;
}());
exports.TopUpService = TopUpService;
//# sourceMappingURL=top-up.service.js.map