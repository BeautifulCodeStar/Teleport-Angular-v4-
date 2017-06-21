"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var application_service_1 = require("../../../services/application.service");
var message_service_1 = require("../../../services/message.service");
var usage_service_1 = require("../../../services/usage.service");
var FIND_APPID_IN_URL = /^\/apiv1\/applications\/([a-z0-9\-]+)\/history\/usage/;
var TeleportDevPortalDataUsageComponent = (function () {
    function TeleportDevPortalDataUsageComponent(usage, apps, messages, router, location) {
        this.usage = usage;
        this.apps = apps;
        this.messages = messages;
        this.router = router;
        this.location = location;
        this._isBusy = false;
    }
    TeleportDevPortalDataUsageComponent.prototype.getQueryFromUrl = function () {
        var params = this.router.parseUrl(this.router.url).queryParams;
        var appId = this.router.url.match(FIND_APPID_IN_URL)[1];
        var filters = {
            beginDate: params.beginDate,
            endDate: params.endDate,
            appId: params.appId || appId || "",
        };
        return [filters];
    };
    TeleportDevPortalDataUsageComponent.prototype.setQueryOnUrl = function () {
        this.location.replaceState(window.location.pathname, "beginDate=" + encodeURIComponent(this.filters.beginDate) + "&endDate=" + encodeURIComponent(this.filters.endDate) + "&appId=" + this.filters.appId);
    };
    TeleportDevPortalDataUsageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filters = this.getQueryFromUrl()[0];
        this._isBusy = true;
        this._subscription = this.apps.Observable
            .filter(function (a) { return !!a; })
            .subscribe(function (apps) { return _this._apps = apps; });
        setImmediate(function () { return _this.loadUsage(); });
    };
    TeleportDevPortalDataUsageComponent.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this._usage;
        delete this._apps;
    };
    Object.defineProperty(TeleportDevPortalDataUsageComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalDataUsageComponent.prototype, "Usage", {
        get: function () {
            return this._usage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalDataUsageComponent.prototype, "Apps", {
        get: function () {
            return this._apps || [];
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalDataUsageComponent.prototype.loadUsage = function () {
        var _this = this;
        try {
            var _a = this.getNowAndFirst(), now = _a[0], first = _a[1];
            var req = {
                beginDate: this.filters.beginDate ? new Date(this.filters.beginDate) : first,
                endDate: this.filters.endDate ? new Date(this.filters.endDate) : now,
                appId: this.filters.appId || "",
            };
            if (isNaN(req.beginDate.getTime()) || isNaN(req.endDate.getTime())) {
                this.messages.error("Usage Failure", "The Begin and/or End Dates are invalid.");
                return;
            }
            if (req.beginDate >= req.endDate) {
                this.messages.error("Usage Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }
            if (req.endDate.getTime() - req.beginDate.getTime() > 1000 * 60 * 60 * 24 * 31) {
                this.messages.error("Usage Failure", "The Begin Date and End Date cannot span more that a month.");
                return;
            }
            this._isBusy = true;
            this.usage.pullUsage(req)
                .then(function (u) {
                _this._isBusy = false;
                _this.filters.beginDate = new Date(u.beginDate).toLocaleString();
                _this.filters.endDate = new Date(u.endDate).toLocaleString();
                _this._usage = _this.transformUsage(u.usage);
                _this.setQueryOnUrl();
            })
                .catch(function (err) {
                _this._isBusy = false;
                _this.messages.error("Usage Failure", err.message, err);
            });
        }
        catch (err) {
            console.error(err);
            this._isBusy = false;
            this.messages.error("Usage Failure", err.message, err);
        }
    };
    TeleportDevPortalDataUsageComponent.prototype.transformUsage = function (usage) {
        var usageView = [{
                type: "total",
                description: "",
                quantity: 0,
                average: 0,
                total: 0,
            }];
        usage.sort(function (a, b) { return a.service_label.localeCompare(b.service_label); })
            .forEach(function (service) {
            usageView[0].quantity += service.quantity;
            usageView[0].total += service.price_total;
            usageView.push({
                type: "service",
                description: service.service_label,
                quantity: service.quantity,
                average: service.price_total / service.quantity,
                total: service.price_total,
            });
            service.locations.sort(function (a, b) { return a.country_label.localeCompare(b.country_label); })
                .forEach(function (location) {
                usageView.push({
                    type: "location",
                    description: location.country_label,
                    quantity: location.quantity,
                    average: location.price_total / location.quantity,
                    total: location.price_total,
                });
                location.items.sort(function (a, b) { return a.label.localeCompare(b.label); })
                    .forEach(function (item) {
                    usageView.push({
                        type: "item",
                        description: item.label,
                        quantity: item.quantity,
                        average: item.price_total / item.quantity,
                        total: item.price_total,
                    });
                });
            });
        });
        usageView[0].average = usageView[0].quantity ? usageView[0].total / usageView[0].quantity : 0;
        return usageView;
    };
    TeleportDevPortalDataUsageComponent.prototype.getNowAndFirst = function () {
        var now = new Date();
        var first = new Date();
        first.setDate(1);
        first.setHours(0, 0, 0, 0);
        return [now, first];
    };
    TeleportDevPortalDataUsageComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-data-usage",
                    templateUrl: "data.usage.html",
                },] },
    ];
    TeleportDevPortalDataUsageComponent.ctorParameters = function () { return [
        { type: usage_service_1.UsageService, decorators: [{ type: core_1.Inject, args: [usage_service_1.UsageService,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: common_1.Location, decorators: [{ type: core_1.Inject, args: [common_1.Location,] },] },
    ]; };
    return TeleportDevPortalDataUsageComponent;
}());
exports.TeleportDevPortalDataUsageComponent = TeleportDevPortalDataUsageComponent;
//# sourceMappingURL=data.usage.component.js.map