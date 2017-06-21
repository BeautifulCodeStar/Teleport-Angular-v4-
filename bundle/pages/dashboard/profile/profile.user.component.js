"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("../../../services/account.service");
var user_service_1 = require("../../../services/user.service");
var message_service_1 = require("../../../services/message.service");
var modal_service_1 = require("../../../services/modal.service");
var Developer_1 = require("../../../models/Developer");
var EmailValidator_1 = require("../../../utils/EmailValidator");
var TeleportDevPortalUserProfileComponent = (function () {
    function TeleportDevPortalUserProfileComponent(router, account, users, modal, messages) {
        this.router = router;
        this.account = account;
        this.users = users;
        this.modal = modal;
        this.messages = messages;
        this.isBusy = false;
        this.isEditProfile = false;
        this.isChangePassword = false;
    }
    TeleportDevPortalUserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscription = this.account.Observable
            .filter(function (d) { return !!d; })
            .subscribe(function (dev) {
            var user = new Developer_1.Developer(dev).toJSON().portalUser;
            if (user === undefined) {
                throw new ReferenceError("The PortalUser was undefined on the Developer object.");
            }
            _this._user = user;
            if (!_this.isEditProfile) {
                _this.User = Object.assign({}, _this._user);
                console.log(_this.User);
            }
        });
    };
    TeleportDevPortalUserProfileComponent.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this.User;
        delete this._user;
    };
    TeleportDevPortalUserProfileComponent.prototype.onStartEditMode = function () {
        this.isEditProfile = true;
        this.User = Object.assign({}, this._user);
    };
    TeleportDevPortalUserProfileComponent.prototype.closePasswordForm = function () {
        this.isChangePassword = false;
    };
    TeleportDevPortalUserProfileComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalUserProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isBusy = true;
        this.users.update(this.User)
            .then(function () {
            _this.messages.info("User Account Updated", "The changes to your user account were successfully saved.");
            _this.isBusy = false;
            _this.isEditProfile = false;
        })
            .catch(function (err) {
            _this.messages.error("User Account Update Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalUserProfileComponent.prototype.onDelete = function () {
        var _this = this;
        this.modal.show("Delete My User Account", "<p>Clicking OK will delete your user account. This will not affect the main account or its applications.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.users.remove(_this._user)
                    .then(function () {
                    _this.messages.warning("User Account Deleted", "Your user account has been deleted.");
                    return _this.router.navigateByUrl("/logout");
                })
                    .catch(function (err) {
                    _this.isBusy = false;
                    _this.messages.error("Delete Account Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalUserProfileComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.isEditProfile = false;
        this.User = Object.assign({}, this._user);
    };
    TeleportDevPortalUserProfileComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-profile",
                    templateUrl: "profile.user.html",
                },] },
    ];
    TeleportDevPortalUserProfileComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: user_service_1.UserService, decorators: [{ type: core_1.Inject, args: [user_service_1.UserService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalUserProfileComponent;
}());
exports.TeleportDevPortalUserProfileComponent = TeleportDevPortalUserProfileComponent;
//# sourceMappingURL=profile.user.component.js.map