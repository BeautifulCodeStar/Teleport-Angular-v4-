"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("./account.service");
var Permissions_1 = require("../utils/Permissions");
var PermsGuardCanActivate = (function () {
    function PermsGuardCanActivate(account, router) {
        this.account = account;
        this.router = router;
    }
    PermsGuardCanActivate.prototype.canActivateChild = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.account.Observable
                .first(function (d) { return !!d; })
                .subscribe(function (dev) {
                var routeData = route.data;
                if (routeData.perms && !Permissions_1.validate(dev.permissions, routeData.perms.reduce(function (p, c) { return (p[c] = true) && p; }, {}))) {
                    _this.router.navigate(["/apiv1/access-denied"], { queryParams: { perms: routeData.perms.join("|") } })
                        .then(function () { return resolve(false); })
                        .catch(function (err) { return reject(err); });
                }
                return resolve(true);
            });
        });
    };
    PermsGuardCanActivate.decorators = [
        { type: core_1.Injectable },
    ];
    PermsGuardCanActivate.ctorParameters = function () { return [
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
    ]; };
    return PermsGuardCanActivate;
}());
exports.PermsGuardCanActivate = PermsGuardCanActivate;
//# sourceMappingURL=perms-guard.service.js.map