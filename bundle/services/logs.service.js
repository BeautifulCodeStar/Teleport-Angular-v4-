"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var account_service_1 = require("./account.service");
var LogsService = (function () {
    function LogsService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this._lastRefresh = 0;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
    }
    LogsService.prototype.destroy = function () {
        if (this._observer) {
            this._observer.complete();
        }
        delete this._logs;
    };
    Object.defineProperty(LogsService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable_1.Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .do(function (logs) { return _this._logs = logs; })
                    .multicast(new BehaviorSubject_1.BehaviorSubject(this._logs))
                    .refCount();
            }
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    LogsService.prototype.refresh = function () {
        var _this = this;
        if (this._lastRefresh > Date.now() - 1000) {
            return Promise.resolve(this._logs);
        }
        this._lastRefresh = Date.now();
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "data",
            "logs",
        ].join("/");
        return this.http.get(url, { search: this._searchParams, withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().data; })
            .map(function (data) { return ({
            isTruncated: data.is_truncated,
            updatedOn: new Date(),
            beginDate: new Date(data.begin_date),
            endDate: new Date(data.end_date),
            logs: data.logs.map(function (l) { return Object.assign({}, l, { start_time: new Date(l.start_time), end_time: new Date(l.end_time) }); }),
        }); })
            .do(function (logs) { if (_this._observer) {
            _this._observer.next(logs);
        } })
            .toPromise();
    };
    LogsService.prototype.loadLogs = function (logs) {
        this._searchParams = new http_1.URLSearchParams();
        if (logs.beginDate) {
            this._searchParams.set("begin_date", logs.beginDate.toISOString());
        }
        if (logs.endDate) {
            this._searchParams.set("end_date", logs.endDate.toISOString());
        }
        if (logs.appId) {
            this._searchParams.set("app_id", logs.appId);
        }
        if (logs.direction !== "both") {
            this._searchParams.set("direction", logs.direction || "inbound");
        }
        if (logs.connectTime) {
            this._searchParams.set("connect_time", String(logs.connectTime));
        }
        return this.refresh();
    };
    LogsService.decorators = [
        { type: core_1.Injectable },
    ];
    LogsService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return LogsService;
}());
exports.LogsService = LogsService;
//# sourceMappingURL=logs.service.js.map