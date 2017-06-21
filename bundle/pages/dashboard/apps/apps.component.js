"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_service_1 = require("../../../services/application.service");
var session_service_1 = require("../../../services/session.service");
var TeleportDevPortalAppsComponent = (function () {
    function TeleportDevPortalAppsComponent(session, applications) {
        this.session = session;
        this.applications = applications;
        this.sortBy = [this.sortByNameAsc];
        this.filterOn = "";
        this.showNum = 20;
        this._applications = [];
        this._isBusy = false;
    }
    TeleportDevPortalAppsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isBusy = true;
        this.session.Observable
            .filter(function (s) { return !!s; })
            .take(1)
            .subscribe(function (s) { if (s !== null) {
            _this.Developer = s.developer;
        } });
        this._subscription = this.applications.Observable
            .filter(function (a) { return !!a; })
            .subscribe(function (apps) {
            _this._isBusy = false;
            _this._applications = apps;
        });
    };
    TeleportDevPortalAppsComponent.prototype.ngOnDestroy = function () {
        console.log("Destroy apps.components");
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this.Developer;
        this._applications = [];
        delete this._subscription;
        this.sortBy = [this.sortByNameDesc, this.sortByNotesAsc, this.sortByNotesDesc, this.sortByCreatedOnAsc, this.sortByCreatedOnDesc];
    };
    Object.defineProperty(TeleportDevPortalAppsComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppsComponent.prototype, "totalApps", {
        get: function () {
            return this._applications.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppsComponent.prototype, "Applications", {
        get: function () {
            var _this = this;
            return this.sortBy
                .reduce(function (apps, s) { return apps.sort(s); }, this._applications.slice(0))
                .filter(function (app) { return ["friendlyName", "notes", "name"].some(function (param) { return app[param].toLowerCase().includes(_this.filterOn.toLowerCase()); }); })
                .slice(0, this.showNum);
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppsComponent.prototype.requestAppsRefresh = function () {
        this.applications.refreshApps();
    };
    TeleportDevPortalAppsComponent.prototype.hasSort = function (funcName) {
        return this.sortBy.indexOf(this[funcName]) !== -1;
    };
    TeleportDevPortalAppsComponent.prototype.toggleSort = function (param) {
        if (this.hasSort("sortBy" + param + "Asc")) {
            this.sortBy.splice(this.sortBy.indexOf(this["sortBy" + param + "Asc"]), 1);
            this.sortBy.push(this["sortBy" + param + "Desc"]);
        }
        else if (this.hasSort("sortBy" + param + "Desc")) {
            this.sortBy.splice(this.sortBy.indexOf(this["sortBy" + param + "Desc"]), 1);
        }
        else {
            this.sortBy.push(this["sortBy" + param + "Asc"]);
        }
    };
    TeleportDevPortalAppsComponent.prototype.sortByNameAsc = function (a, b) {
        return a.friendlyName.localeCompare(b.friendlyName);
    };
    TeleportDevPortalAppsComponent.prototype.sortByNameDesc = function (a, b) {
        return b.friendlyName.localeCompare(a.friendlyName);
    };
    TeleportDevPortalAppsComponent.prototype.sortByNotesAsc = function (a, b) {
        return a.notes.localeCompare(b.notes);
    };
    TeleportDevPortalAppsComponent.prototype.sortByNotesDesc = function (a, b) {
        return b.notes.localeCompare(a.notes);
    };
    TeleportDevPortalAppsComponent.prototype.sortByCreatedOnAsc = function (a, b) {
        return +a.createdAt - +b.createdAt;
    };
    TeleportDevPortalAppsComponent.prototype.sortByCreatedOnDesc = function (a, b) {
        return +b.createdAt - +a.createdAt;
    };
    TeleportDevPortalAppsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-apps",
                    templateUrl: "apps.html",
                },] },
    ];
    TeleportDevPortalAppsComponent.ctorParameters = function () { return [
        { type: session_service_1.SessionService, decorators: [{ type: core_1.Inject, args: [session_service_1.SessionService,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
    ]; };
    return TeleportDevPortalAppsComponent;
}());
exports.TeleportDevPortalAppsComponent = TeleportDevPortalAppsComponent;
//# sourceMappingURL=apps.component.js.map