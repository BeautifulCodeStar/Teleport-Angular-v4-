"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Developer_1 = require("../models/Developer");
var SessionService = (function () {
    function SessionService(http) {
        this.http = http;
        this._isPingOnHold = false;
        this._lastRefresh = 0;
        console.log("new SessionService()", http);
    }
    SessionService.prototype.cleanup = function () {
        delete this._session;
    };
    Object.defineProperty(SessionService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Rx_1.Observable
                    .create(function (observer) { return _this.createObservable(observer); })
                    .do(function (s) {
                    _this._session = s;
                    _this._isPingOnHold = !s;
                })
                    .multicast(new BehaviorSubject_1.BehaviorSubject(this._session))
                    .refCount();
            }
            this.refresh();
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    SessionService.prototype.refresh = function () {
        var _this = this;
        if (!!this._session && this._lastRefresh > Date.now() - 500) {
            return;
        }
        this._lastRefresh = Date.now();
        this._isPingOnHold = false;
        this.pingSession()
            .then(function (session) {
            if (_this._observer) {
                _this._observer.next(session);
            }
        })
            .catch(function (err) {
            console.error("SessionService", err);
            if (_this._observer) {
                _this._observer.next(null);
            }
        });
    };
    SessionService.prototype.createObservable = function (observer) {
        var _this = this;
        console.log("SessionService.createObservable", observer);
        this._observer = observer;
        this.refresh();
        var id = setInterval(function () {
            if (!_this._isPingOnHold) {
                _this.refresh();
            }
        }, 1000 * 60 * 5);
        return function () {
            console.log("SessionService.createObservable complete", observer);
            delete _this._observer;
            delete _this._observable;
            delete _this._session;
            clearInterval(id);
        };
    };
    SessionService.prototype.pingSession = function () {
        var _this = this;
        var url = [
            API_BASE_URL,
            "auth/developers",
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Rx_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (res) { return res.json().developer; })
            .catch(function () { return Rx_1.Observable.throw(new Error("No Developer object was found.")); })
            .map(function (dev) { return ({
            loginAt: _this._session ? _this._session.loginAt : new Date(),
            refreshAt: new Date(),
            developer: new Developer_1.Developer(dev),
        }); })
            .toPromise();
    };
    SessionService.decorators = [
        { type: core_1.Injectable },
    ];
    SessionService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
    ]; };
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map