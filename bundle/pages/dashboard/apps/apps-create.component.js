"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_service_1 = require("../../../services/application.service");
var TeleportDevPortalAppsCreateComponent = (function () {
    function TeleportDevPortalAppsCreateComponent(router, applications) {
        this.router = router;
        this.applications = applications;
        this.isBusy = false;
        this.appName = "";
        this.appNotes = "";
        this.isCaptchaOk = false;
        this.reCaptchaResponse = "";
    }
    TeleportDevPortalAppsCreateComponent.prototype.onCaptcha = function (resp, isOk) {
        this.reCaptchaResponse = resp;
        this.isCaptchaOk = isOk;
    };
    TeleportDevPortalAppsCreateComponent.prototype.onSubmitCreateApp = function () {
        var _this = this;
        this.isBusy = true;
        this.applications.createApp(this.appName, this.appNotes, this.reCaptchaResponse)
            .then(function (app) {
            _this.isBusy = false;
            return _this.router.navigate(["/apiv1/applications", app.name]);
        })
            .catch(function () {
            _this.isBusy = false;
        });
    };
    TeleportDevPortalAppsCreateComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-apps-create",
                    templateUrl: "apps-create.html",
                },] },
    ];
    TeleportDevPortalAppsCreateComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
    ]; };
    return TeleportDevPortalAppsCreateComponent;
}());
exports.TeleportDevPortalAppsCreateComponent = TeleportDevPortalAppsCreateComponent;
//# sourceMappingURL=apps-create.component.js.map