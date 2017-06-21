"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Application_1 = require("../models/Application");
var Developer_1 = require("../models/Developer");
var account_service_1 = require("./account.service");
var message_service_1 = require("./message.service");
var ApplicationService = (function () {
    function ApplicationService(http, account, message) {
        var _this = this;
        this.http = http;
        this.account = account;
        this.message = message;
        this._lastRefresh = 0;
        console.log("new ApplicationService()", arguments);
        this._subscription = this.account.Observable
            .filter(function (d) { return !!d; })
            .subscribe(function (d) {
            _this._developer = new Developer_1.Developer(d);
            _this.refreshApps();
        });
    }
    ApplicationService.prototype.cleanup = function () {
        console.log("ApplicationService cleanup");
        if (this._observer) {
            this._observer.complete();
        }
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this._developer;
        delete this._applications;
        this._lastRefresh = 0;
    };
    Object.defineProperty(ApplicationService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable_1.Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .map(function (apps) {
                    apps.sort(function (a, b) { return +(a.friendlyName > b.friendlyName) || +(a.friendlyName === b.friendlyName) - 1; });
                    return apps;
                })
                    .do(function (apps) { return _this._applications = apps; })
                    .multicast(new BehaviorSubject_1.BehaviorSubject(this._applications))
                    .refCount();
            }
            this.refreshApps();
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationService.prototype.refreshApps = function () {
        var _this = this;
        if (!this._developer) {
            return;
        }
        if (this._lastRefresh > Date.now() - 500) {
            return;
        }
        this._lastRefresh = Date.now();
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
        ].join("/");
        this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().apps.map(function (app) { return new Application_1.Application(app); }); })
            .subscribe(function (apps) {
            if (_this._observer) {
                _this._observer.next(apps);
            }
        }, function (err) { return _this.message.error("Application List Refresh Failure", err.message, err); });
    };
    ApplicationService.prototype.getAppByName = function (appName) {
        var _this = this;
        var app = this._applications && this._applications.find(function (a) { return a.name === appName; });
        if (app) {
            return Promise.resolve(new Application_1.Application(app));
        }
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(appName),
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return new Application_1.Application(resp.json().app); })
            .catch(function (err) { return _this.message.error("Application Failed to Load", "Perhaps no application exists by that name.", err); })
            .toPromise();
    };
    ApplicationService.prototype.createApp = function (appName, notes, reCaptchaResponse) {
        var _this = this;
        if (notes === void 0) { notes = ""; }
        if (reCaptchaResponse === void 0) { reCaptchaResponse = ""; }
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.post(url, JSON.stringify({ appName: appName, notes: notes, "g-recaptcha-response": reCaptchaResponse }), { headers: headers, withCredentials: true })
            .catch(function (err) {
            _this.message.error("New Application Failure", err.json().user_message, new Error("Bad response status: " + err.status));
            return Observable_1.Observable.throw(new Error(err.json().user_message));
        })
            .map(function (resp) { return new Application_1.Application(resp.json()); })
            .do(function (app) { return _this.message.info("New Application Created", "The application \"" + app.friendlyName + "\" has been created."); })
            .do(function () { return _this.refreshApps(); })
            .catch(function (err) { return _this.message.error("Application Glitch", "It looks like the application was created but the web app glitched. Try refreshing this view to see the new application.", err); })
            .toPromise();
    };
    ApplicationService.prototype.updateApp = function (app, appName, notes) {
        var _this = this;
        if (notes === void 0) { notes = app.notes; }
        if (app.name === appName && app.notes === notes) {
            this.message.warning("Application Update Failure", "No changes were found for the application.");
            return Promise.reject(new Error("Application Update Failure"));
        }
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.put(url, JSON.stringify({ appName: appName, notes: notes }), { headers: headers, withCredentials: true })
            .catch(function (err) { return _this.message.error("Application Update Failure", err.json().user_message, new Error("Bad response status: " + err.status)); })
            .map(function (resp) { return new Application_1.Application(resp.json()); })
            .do(function () { return _this.message.info("Application Updated", "The application \"" + app.friendlyName + "\" has been updated."); })
            .do(function () { return _this.refreshApps(); })
            .toPromise();
    };
    ApplicationService.prototype.deleteApp = function (app) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
        ].join("/");
        return this.http.delete(url, { withCredentials: true })
            .catch(function (err) { return _this.message.error("Application Delete Failure", err.json().user_message, new Error("Bad response status: " + err.status)); })
            .do(function () { return _this.message.info("Application Deleted", "The application \"" + app.friendlyName + "\" has been removed."); })
            .map(function () { return true; })
            .do(function () { return _this.refreshApps(); })
            .toPromise();
    };
    ApplicationService.prototype.createAppCredentials = function (app) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
            "credentials",
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.post(url, "", { headers: headers, withCredentials: true })
            .catch(function (err) { return _this.message.error("Credentials Create Failure", err.json().user_message, new Error("Bad response status: " + err.status)); })
            .map(function (resp) { return new Application_1.Application(resp.json().app); })
            .do(function () { return _this.message.info("Credentials Created", "New application credentials were created."); })
            .do(function () { return _this.refreshApps(); })
            .toPromise();
    };
    ApplicationService.prototype.deleteAppCredentials = function (app, creds) {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
            "credentials",
            encodeURIComponent(creds.apiKey),
        ].join("/");
        return this.http.delete(url, { withCredentials: true })
            .catch(function (err) { return _this.message.error("Credentials Delete Failure", err.json().user_message, new Error("Bad response status: " + err.status)); })
            .map(function () { return true; })
            .do(function () { return _this.message.info("Credentials Deleted", "The application credentials were deleted."); })
            .do(function () { return _this.refreshApps(); })
            .toPromise();
    };
    ApplicationService.decorators = [
        { type: core_1.Injectable },
    ];
    ApplicationService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return ApplicationService;
}());
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map