"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_service_1 = require("../../../services/login.service");
var message_service_1 = require("../../../services/message.service");
var TeleportDevPortalLogoutComponent = (function () {
    function TeleportDevPortalLogoutComponent(router, login, message) {
        this.router = router;
        this.login = login;
        this.message = message;
    }
    TeleportDevPortalLogoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.login.logout()
                .then(function () {
                console.log("Logout Success");
            })
                .catch(function (err) {
                console.log("Error on checkout: ", err.stack);
                _this.message.error("Oops! Logout Failure.", "An error prevented log out. Try again.", err);
                return _this.router.navigateByUrl("/dashboard");
            });
        }, 1000);
    };
    TeleportDevPortalLogoutComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-logout",
                    templateUrl: "logout.html",
                },] },
    ];
    TeleportDevPortalLogoutComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: login_service_1.LoginService, decorators: [{ type: core_1.Inject, args: [login_service_1.LoginService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalLogoutComponent;
}());
exports.TeleportDevPortalLogoutComponent = TeleportDevPortalLogoutComponent;
//# sourceMappingURL=logout.component.js.map