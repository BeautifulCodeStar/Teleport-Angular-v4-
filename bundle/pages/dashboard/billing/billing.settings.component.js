"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var billing_service_1 = require("../../../services/billing.service");
var TeleportDevPortalBillingSettingsComponent = (function () {
    function TeleportDevPortalBillingSettingsComponent(billing) {
        this.billing = billing;
    }
    TeleportDevPortalBillingSettingsComponent.prototype.ngAfterViewInit = function () {
        this.billing.getBraintreeClientToken()
            .then(function (token) {
            braintree.setup(token, "dropin", {
                container: "dropin-container",
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    TeleportDevPortalBillingSettingsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-billing-settings",
                    templateUrl: "billing.settings.html",
                },] },
    ];
    TeleportDevPortalBillingSettingsComponent.ctorParameters = function () { return [
        { type: billing_service_1.BillingService, decorators: [{ type: core_1.Inject, args: [billing_service_1.BillingService,] },] },
    ]; };
    return TeleportDevPortalBillingSettingsComponent;
}());
exports.TeleportDevPortalBillingSettingsComponent = TeleportDevPortalBillingSettingsComponent;
//# sourceMappingURL=billing.settings.component.js.map