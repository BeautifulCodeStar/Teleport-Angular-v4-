"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var account_service_1 = require("./account.service");
var IntegrationsWatsonService = (function () {
    function IntegrationsWatsonService(http, account) {
        var _this = this;
        this.http = http;
        this.account = account;
        this.account.Observable.first(function (d) { return !!d; }).subscribe(function (d) { return _this._developer = d; });
    }
    IntegrationsWatsonService.prototype.getTextToSpeech = function (appId) {
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");
        return this.http
            .get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().settings; })
            .toPromise();
    };
    IntegrationsWatsonService.prototype.putTextToSpeech = function (appId, watson) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");
        return this.http
            .put(url, JSON.stringify(watson), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().settings; })
            .toPromise();
    };
    IntegrationsWatsonService.prototype.deleteTextToSpeech = function (appId) {
        var url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");
        return this.http
            .delete(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (r) { return r.json().settings; })
            .toPromise();
    };
    IntegrationsWatsonService.decorators = [
        { type: core_1.Injectable },
    ];
    IntegrationsWatsonService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return IntegrationsWatsonService;
}());
exports.IntegrationsWatsonService = IntegrationsWatsonService;
//# sourceMappingURL=integrations.watson.service.js.map