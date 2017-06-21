"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var login_service_1 = require("../../services/login.service");
var message_service_1 = require("../../services/message.service");
var PasswordUtil_1 = require("../../utils/PasswordUtil");
var EmailValidator_1 = require("../../utils/EmailValidator");
var TeleportDevPortalRecoverPasswordComponent = (function () {
    function TeleportDevPortalRecoverPasswordComponent(route, logins, messages) {
        this.route = route;
        this.logins = logins;
        this.messages = messages;
        this.isBusy = false;
        this.isSuccess = false;
        this.email = "";
        this.newPassword = "";
        this.newPasswordVerify = "";
        this.isCaptchaOk = false;
        this.reCaptchaResponse = "";
    }
    TeleportDevPortalRecoverPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._resetCaptchaObservable = Observable_1.Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.ngOnDestroy = function () {
        if (this._resetCaptchaObserver) {
            this._resetCaptchaObserver.complete();
        }
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil_1.default.satisfies(pw);
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.passwordsMatch = function () {
        return this.newPassword === this.newPasswordVerify;
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.onCaptcha = function (token, val) {
        this.reCaptchaResponse = token;
        this.isCaptchaOk = val;
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalRecoverPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.newPassword || !this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (!PasswordUtil_1.default.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "Your password must be at least 8 characters and contain caps, lowercase, numbers and special characters.");
            return;
        }
        this.isBusy = true;
        var authKey = this.route.snapshot.params.key;
        this.logins.resetPassword(this.email, this.newPassword, authKey, this.reCaptchaResponse)
            .then(function () {
            _this.isSuccess = true;
            _this.isBusy = false;
        })
            .catch(function (err) {
            console.error("Recovery failure.", err);
            _this.isSuccess = false;
            _this.isBusy = false;
            _this._resetCaptchaObserver.next(true);
            _this.messages.error("Recovery Failed", err.message, err);
        });
    };
    TeleportDevPortalRecoverPasswordComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-recover-password",
                    templateUrl: "recover.html",
                },] },
    ];
    TeleportDevPortalRecoverPasswordComponent.ctorParameters = function () { return [
        { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Inject, args: [router_1.ActivatedRoute,] },] },
        { type: login_service_1.LoginService, decorators: [{ type: core_1.Inject, args: [login_service_1.LoginService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalRecoverPasswordComponent;
}());
exports.TeleportDevPortalRecoverPasswordComponent = TeleportDevPortalRecoverPasswordComponent;
//# sourceMappingURL=recover.component.js.map