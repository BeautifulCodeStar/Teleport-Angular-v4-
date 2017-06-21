"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("../../../services/account.service");
var message_service_1 = require("../../../services/message.service");
var modal_service_1 = require("../../../services/modal.service");
var Developer_1 = require("../../../models/Developer");
var EmailValidator_1 = require("../../../utils/EmailValidator");
var TeleportDevPortalProfileComponent = (function () {
    function TeleportDevPortalProfileComponent(router, account, modal, messages) {
        this.router = router;
        this.account = account;
        this.modal = modal;
        this.messages = messages;
        this.isBusy = false;
        this.isEditProfile = false;
        this.isChangePassword = false;
    }
    TeleportDevPortalProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("UIProfile Init");
        this._subscription = this.account.Observable
            .filter(function (d) { return !!d; })
            .subscribe(function (dev) {
            if (dev.portalUser) {
                _this.router.navigateByUrl("/apiv1/account/user");
                return;
            }
            _this._developer = new Developer_1.Developer(dev).toJSON();
            if (!_this.isEditProfile) {
                _this.Developer = Object.assign({}, _this._developer);
                console.log(_this.Developer);
            }
        });
    };
    TeleportDevPortalProfileComponent.prototype.ngOnDestroy = function () {
        console.log("UIProfile Destroy");
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this.Developer;
        delete this._developer;
    };
    TeleportDevPortalProfileComponent.prototype.onStartEditMode = function () {
        this.isEditProfile = true;
        this.Developer = Object.assign({}, this._developer);
    };
    TeleportDevPortalProfileComponent.prototype.closePasswordForm = function () {
        this.isChangePassword = false;
    };
    TeleportDevPortalProfileComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isBusy = true;
        this.account.update(this.Developer)
            .then(function () {
            _this.messages.info("Account Updated", "The changes to your account were successfully saved.");
            _this.isBusy = false;
            _this.isEditProfile = false;
        })
            .catch(function (err) {
            _this.messages.error("Account Update Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalProfileComponent.prototype.onDelete = function () {
        var _this = this;
        this.modal.show("Delete My Account", "<p>Clicking OK will delete your account. All applications under this account will stop working. All phone numbers will be released.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.account.deleteAccount(_this._developer.id)
                    .then(function () {
                    _this.messages.warning("Account Deleted", "Your account has been deleted.");
                    return _this.router.navigateByUrl("/logout");
                })
                    .catch(function (err) {
                    _this.isBusy = false;
                    _this.messages.error("Delete Account Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalProfileComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.isEditProfile = false;
        this.Developer = Object.assign({}, this._developer);
    };
    TeleportDevPortalProfileComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-profile",
                    templateUrl: "profile.html",
                },] },
    ];
    TeleportDevPortalProfileComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalProfileComponent;
}());
exports.TeleportDevPortalProfileComponent = TeleportDevPortalProfileComponent;
//# sourceMappingURL=profile.component.js.map