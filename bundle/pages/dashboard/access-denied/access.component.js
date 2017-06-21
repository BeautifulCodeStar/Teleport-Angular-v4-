"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var session_service_1 = require("../../../services/session.service");
var Permissions_1 = require("../../../utils/Permissions");
var TeleportDevPortalAccessDeniedComponent = (function () {
    function TeleportDevPortalAccessDeniedComponent(session, route) {
        this.session = session;
        this.route = route;
        this._reqPerms = [];
        this._devPerms = {};
    }
    TeleportDevPortalAccessDeniedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._reqPerms = (this.route.snapshot.queryParams.perms || "").split("|");
        this.session.Observable
            .skipWhile(function (s) { return !s; })
            .take(1)
            .subscribe(function (s) { if (s !== null) {
            _this._devPerms = s.developer.permissions;
        } });
    };
    TeleportDevPortalAccessDeniedComponent.prototype.ngOnDestroy = function () {
        this._reqPerms = [];
        this._devPerms = {};
    };
    Object.defineProperty(TeleportDevPortalAccessDeniedComponent.prototype, "RequiredPermissions", {
        get: function () {
            return this._reqPerms;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAccessDeniedComponent.prototype.hasPermission = function (perm) {
        return Permissions_1.validate(this._devPerms, (_a = {}, _a[perm] = true, _a));
        var _a;
    };
    TeleportDevPortalAccessDeniedComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-access-denied",
                    templateUrl: "access.html",
                },] },
    ];
    TeleportDevPortalAccessDeniedComponent.ctorParameters = function () { return [
        { type: session_service_1.SessionService, decorators: [{ type: core_1.Inject, args: [session_service_1.SessionService,] },] },
        { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Inject, args: [router_1.ActivatedRoute,] },] },
    ]; };
    return TeleportDevPortalAccessDeniedComponent;
}());
exports.TeleportDevPortalAccessDeniedComponent = TeleportDevPortalAccessDeniedComponent;
//# sourceMappingURL=access.component.js.map