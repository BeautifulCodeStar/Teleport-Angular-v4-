"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var logs_service_1 = require("../../../services/logs.service");
var application_service_1 = require("../../../services/application.service");
var message_service_1 = require("../../../services/message.service");
var FIND_APPID_IN_URL = /^\/apiv1\/applications\/([a-z0-9\-]+)\/history\/logs/;
var TeleportDevPortalDataLogsComponent = (function () {
    function TeleportDevPortalDataLogsComponent(logs, apps, messages, router, location) {
        this.logs = logs;
        this.apps = apps;
        this.messages = messages;
        this.router = router;
        this.location = location;
        this._isBusy = false;
        this._sortFuncs = {
            "callIdDesc": function (a, b) { return b.call_id.localeCompare(a.call_id); },
            "callIdAsc": function (a, b) { return a.call_id.localeCompare(b.call_id); },
            "apiNoDesc": function (a, b) { return b.api_no.localeCompare(a.api_no); },
            "apiNoAsc": function (a, b) { return a.api_no.localeCompare(b.api_no); },
            "callerNoDesc": function (a, b) { return b.caller_no.localeCompare(a.caller_no); },
            "callerNoAsc": function (a, b) { return a.caller_no.localeCompare(b.caller_no); },
            "typeDesc": function (a, b) { return b.type.localeCompare(a.type); },
            "typeAsc": function (a, b) { return a.type.localeCompare(b.type); },
            "statusDesc": function (a, b) { return b.status.localeCompare(a.status); },
            "statusAsc": function (a, b) { return a.status.localeCompare(b.status); },
            "directionDesc": function (a, b) { return b.direction.localeCompare(a.direction); },
            "directionAsc": function (a, b) { return a.direction.localeCompare(b.direction); },
            "durationDesc": function (a, b) { return +b.duration - +a.duration; },
            "durationAsc": function (a, b) { return +a.duration - +b.duration; },
            "startTimeDesc": function (a, b) { return +b.start_time - +a.start_time; },
            "startTimeAsc": function (a, b) { return +a.start_time - +b.start_time; },
            "endTimeDesc": function (a, b) { return +b.end_time - +a.end_time; },
            "endTimeAsc": function (a, b) { return +a.end_time - +b.end_time; },
            "appIdDesc": function (a, b) { return b.app_id.localeCompare(a.app_id); },
            "appIdAsc": function (a, b) { return a.app_id.localeCompare(b.app_id); },
            "billedTimeDesc": function (a, b) { return +b.connect_time_billed - +a.connect_time_billed; },
            "billedTimeAsc": function (a, b) { return +a.connect_time_billed - +b.connect_time_billed; },
            "originApiDesc": function (a, b) { return b.origin_api.localeCompare(a.origin_api); },
            "originApiAsc": function (a, b) { return a.origin_api.localeCompare(b.origin_api); },
        };
        this._sortOn = "startTimeDesc";
    }
    TeleportDevPortalDataLogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        _a = this.getQueryFromUrl(), this.filters = _a[0], this._sortOn = _a[1];
        this._isBusy = true;
        this._subscriptions = [
            this.logs.Observable
                .filter(function (a) { return !!a; })
                .subscribe(function (logs) {
                _this._isBusy = false;
                _this._logs = logs;
                _this.sortLogs();
                _this.filters.beginDate = new Date(String(logs.beginDate)).toLocaleString();
                _this.filters.endDate = new Date(String(logs.endDate)).toLocaleString();
            }),
            this.apps.Observable
                .filter(function (a) { return !!a; })
                .subscribe(function (apps) { return _this._apps = apps; }),
        ];
        setImmediate(function () { return _this.loadLogs(); });
        var _a;
    };
    TeleportDevPortalDataLogsComponent.prototype.ngOnDestroy = function () {
        if (this._subscriptions) {
            this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        }
        delete this._logs;
        delete this._apps;
    };
    Object.defineProperty(TeleportDevPortalDataLogsComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalDataLogsComponent.prototype, "Logs", {
        get: function () {
            return this._logs && this._logs.logs || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalDataLogsComponent.prototype, "isTruncated", {
        get: function () {
            return this._logs && this._logs.isTruncated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalDataLogsComponent.prototype, "Apps", {
        get: function () {
            return this._apps || [];
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalDataLogsComponent.prototype.sortLogs = function (sortOn) {
        if (sortOn) {
            var isAsc = this._sortOn.slice(-3) === "Asc";
            if (this._sortOn.startsWith(sortOn)) {
                this._sortOn = sortOn + (isAsc ? "Desc" : "Asc");
            }
            else {
                this._sortOn = sortOn + "Desc";
            }
        }
        this._logs.logs = this._logs.logs.sort(this._sortFuncs[this._sortOn]);
    };
    TeleportDevPortalDataLogsComponent.prototype.isSortOn = function (name) {
        return this._sortOn === name;
    };
    TeleportDevPortalDataLogsComponent.prototype.getQueryFromUrl = function () {
        var params = this.router.parseUrl(this.router.url).queryParams;
        var appId = this.router.url.match(FIND_APPID_IN_URL)[1];
        var now = new Date();
        var filters = {
            beginDate: params.beginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7).toLocaleString(),
            endDate: params.endDate || now.toLocaleString(),
            appId: params.appId || appId || "",
            direction: (params.direction || "both"),
            connectTime: +params.connectTime || 0,
        };
        var sortOn = params.sortOn || "startTimeDesc";
        return [filters, sortOn];
    };
    TeleportDevPortalDataLogsComponent.prototype.setQueryOnUrl = function () {
        var _this = this;
        this.location.replaceState(window.location.pathname, Object.keys(this.filters).reduce(function (p, c) { return p + "&" + c + "=" + encodeURIComponent(String(_this.filters[c])); }, "sortOn=" + this._sortOn));
    };
    TeleportDevPortalDataLogsComponent.prototype.loadLogs = function () {
        var _this = this;
        try {
            var filter = Object.assign({}, this.filters);
            filter.beginDate = filter.beginDate ? new Date(String(filter.beginDate)) : new Date(Date.now() - 1000 * 60 * 60);
            filter.endDate = filter.endDate ? new Date(String(filter.endDate)) : new Date();
            if (filter.beginDate >= filter.endDate) {
                this.messages.error("Logs Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }
            this.setQueryOnUrl();
            this._isBusy = true;
            this.logs.loadLogs(filter)
                .then(function () { return _this._isBusy = false; })
                .catch(function (err) {
                _this._isBusy = false;
                _this.messages.error("Logs Failure", err.message, err);
            });
        }
        catch (err) {
            console.error(err);
            this._isBusy = false;
            this.messages.error("Logs Failure", err.message, err);
        }
    };
    TeleportDevPortalDataLogsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-data-logs",
                    templateUrl: "data.logs.html",
                },] },
    ];
    TeleportDevPortalDataLogsComponent.ctorParameters = function () { return [
        { type: logs_service_1.LogsService, decorators: [{ type: core_1.Inject, args: [logs_service_1.LogsService,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: common_1.Location, decorators: [{ type: core_1.Inject, args: [common_1.Location,] },] },
    ]; };
    return TeleportDevPortalDataLogsComponent;
}());
exports.TeleportDevPortalDataLogsComponent = TeleportDevPortalDataLogsComponent;
//# sourceMappingURL=data.logs.component.js.map