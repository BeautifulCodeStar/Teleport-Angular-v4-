"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var user_service_1 = require("../../../services/user.service");
var message_service_1 = require("../../../services/message.service");
var PasswordUtil_1 = require("../../../utils/PasswordUtil");
var TeleportDevPortalProfilePasswordComponent = (function () {
    function TeleportDevPortalProfilePasswordComponent(account, messages) {
        this.account = account;
        this.messages = messages;
        this.isBusy = false;
        this.password = "";
        this.newPassword = "";
        this.newPasswordVerify = "";
        this.onComplete = new core_1.EventEmitter();
    }
    TeleportDevPortalProfilePasswordComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil_1.default.satisfies(pw);
    };
    TeleportDevPortalProfilePasswordComponent.prototype.passwordsMatch = function () {
        return this.newPassword === this.newPasswordVerify;
    };
    TeleportDevPortalProfilePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.newPassword || !this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }
        if (!PasswordUtil_1.default.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }
        this.isBusy = true;
        this.account.updatePassword(this.password, this.newPassword)
            .then(function () {
            _this.messages.info("Password Change Success", "Your password has been updated.");
            _this.onComplete.emit();
        })
            .catch(function (err) {
            _this.messages.error("Password Change Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalProfilePasswordComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.onComplete.emit();
    };
    TeleportDevPortalProfilePasswordComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-profile-password",
                    templateUrl: "profile.password.html",
                },] },
    ];
    TeleportDevPortalProfilePasswordComponent.ctorParameters = function () { return [
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    TeleportDevPortalProfilePasswordComponent.propDecorators = {
        'onComplete': [{ type: core_1.Output },],
    };
    return TeleportDevPortalProfilePasswordComponent;
}());
exports.TeleportDevPortalProfilePasswordComponent = TeleportDevPortalProfilePasswordComponent;
var TeleportDevPortalUserProfilePasswordComponent = (function () {
    function TeleportDevPortalUserProfilePasswordComponent(users, messages) {
        this.users = users;
        this.messages = messages;
        this.isBusy = false;
        this.password = "";
        this.newPassword = "";
        this.newPasswordVerify = "";
        this.onComplete = new core_1.EventEmitter();
    }
    TeleportDevPortalUserProfilePasswordComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil_1.default.satisfies(pw);
    };
    TeleportDevPortalUserProfilePasswordComponent.prototype.passwordsMatch = function () {
        return this.newPassword === this.newPasswordVerify;
    };
    TeleportDevPortalUserProfilePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.newPassword || !this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }
        if (!PasswordUtil_1.default.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }
        this.isBusy = true;
        this.users.updatePassword(this.user, this.password, this.newPassword)
            .then(function () {
            _this.messages.info("Password Change Success", "Your password has been updated.");
            _this.onComplete.emit();
        })
            .catch(function (err) {
            _this.messages.error("Password Change Failure", err.message, err);
            _this.isBusy = false;
        });
    };
    TeleportDevPortalUserProfilePasswordComponent.prototype.onCancel = function () {
        this.isBusy = false;
        this.onComplete.emit();
    };
    TeleportDevPortalUserProfilePasswordComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-profile-password",
                    templateUrl: "profile.password.html",
                },] },
    ];
    TeleportDevPortalUserProfilePasswordComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, decorators: [{ type: core_1.Inject, args: [user_service_1.UserService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    TeleportDevPortalUserProfilePasswordComponent.propDecorators = {
        'user': [{ type: core_1.Input, args: ["user",] },],
        'onComplete': [{ type: core_1.Output },],
    };
    return TeleportDevPortalUserProfilePasswordComponent;
}());
exports.TeleportDevPortalUserProfilePasswordComponent = TeleportDevPortalUserProfilePasswordComponent;
//# sourceMappingURL=profile.password.component.js.map