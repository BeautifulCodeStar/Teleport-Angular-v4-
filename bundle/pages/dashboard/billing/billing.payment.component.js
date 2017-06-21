"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var billing_service_1 = require("../../../services/billing.service");
var message_service_1 = require("../../../services/message.service");
var modal_service_1 = require("../../../services/modal.service");
var TeleportDevPortalBillingPaymentComponent = (function () {
    function TeleportDevPortalBillingPaymentComponent(router, billing, messages, modal, zone) {
        this.router = router;
        this.billing = billing;
        this.messages = messages;
        this.modal = modal;
        this.zone = zone;
        this.isReady = false;
        this.isBusy = false;
        this.amount = 10;
    }
    TeleportDevPortalBillingPaymentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.isReady = false;
        this.isBusy = false;
        this.amount = 10;
        this.billing.getBraintreeClientToken()
            .then(function (token) {
            braintree.setup(token, "dropin", {
                container: "dropin-container",
                form: "paymentForm",
                onReady: function (integration) {
                    _this._checkout = integration;
                    _this.zone.run(function () { return _this.isReady = true; });
                },
                onPaymentMethodReceived: function (obj) {
                    _this.zone.run(function () {
                        _this.modal.show("Make a Payment", "<p>You are about to charge <strong>$" + _this.amount + "</strong> to your " + obj.type + ".</p>", { type: "confirm" })
                            .then(function (result) {
                            if (result) {
                                if (obj.type === "CreditCard") {
                                    _this.onSubmit(obj.nonce, obj.type, obj.details.cardType, obj.details.lastTwo);
                                }
                                else {
                                    _this.onSubmit(obj.nonce, obj.type, obj.details.email, "");
                                }
                            }
                        });
                    });
                },
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    TeleportDevPortalBillingPaymentComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this._checkout) {
            this._checkout.teardown(function () { return _this._checkout = null; });
        }
    };
    TeleportDevPortalBillingPaymentComponent.prototype.onCancel = function () {
        this.router.navigate(["/apiv1/account/payments"]).catch(function (err) { return console.error(err); });
    };
    TeleportDevPortalBillingPaymentComponent.prototype.onSubmit = function (nonce, method, type, lastFour) {
        var _this = this;
        if (!parseFloat(String(this.amount))) {
            this.messages.warning("Payment Failure", "The amount entered must be a valid number.");
            return;
        }
        this.isBusy = true;
        this.billing.makePayment(this.amount, nonce, method, type, lastFour)
            .then(function () {
            _this.messages.info("Payment Accepted!", "A payment of $" + _this.amount + " was credited to your account.");
            _this.isBusy = false;
            return _this.router.navigate(["/apiv1/account/payments"]);
        })
            .catch(function (err) {
            _this.messages.warning("Payment Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalBillingPaymentComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-billing-payment",
                    templateUrl: "/billing.payment.html",
                },] },
    ];
    TeleportDevPortalBillingPaymentComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: billing_service_1.BillingService, decorators: [{ type: core_1.Inject, args: [billing_service_1.BillingService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
        { type: core_1.NgZone, decorators: [{ type: core_1.Inject, args: [core_1.NgZone,] },] },
    ]; };
    return TeleportDevPortalBillingPaymentComponent;
}());
exports.TeleportDevPortalBillingPaymentComponent = TeleportDevPortalBillingPaymentComponent;
//# sourceMappingURL=billing.payment.component.js.map