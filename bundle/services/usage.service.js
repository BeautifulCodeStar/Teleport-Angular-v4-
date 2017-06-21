"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var account_service_1 = require("./account.service");
var UsageService = (function () {
    function UsageService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
    }
    UsageService.prototype.pullUsage = function (req) {
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "data",
            "usage",
        ].join("/");
        var search = new URLSearchParams();
        search.set("begin_date", req.beginDate.toISOString());
        search.set("end_date", req.endDate.toISOString());
        if (req.appId) {
            search.set("app_id", req.appId);
        }
        return this.http.get(url, { search: search.toString(), withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().data; })
            .map(function (data) { return ({
            beginDate: new Date(data.begin_date),
            endDate: new Date(data.end_date),
            usage: data.usage,
        }); })
            .toPromise();
    };
    UsageService.decorators = [
        { type: core_1.Injectable },
    ];
    UsageService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return UsageService;
}());
exports.UsageService = UsageService;
//# sourceMappingURL=usage.service.js.map