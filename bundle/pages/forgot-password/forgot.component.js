"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var login_service_1 = require("../../services/login.service");
var message_service_1 = require("../../services/message.service");
var EmailValidator_1 = require("../../utils/EmailValidator");
var TeleportDevPortalForgotPasswordComponent = (function () {
    function TeleportDevPortalForgotPasswordComponent(router, logins, messages) {
        var _this = this;
        this.router = router;
        this.logins = logins;
        this.messages = messages;
        this.userName = "";
        this.isBusy = false;
        this.isCaptchaOk = false;
        this.reCaptchaResponse = "";
        this._resetCaptchaObservable = Observable_1.Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    }
    TeleportDevPortalForgotPasswordComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalForgotPasswordComponent.prototype.onCaptcha = function (resp, isOk) {
        this.reCaptchaResponse = resp;
        this.isCaptchaOk = isOk;
    };
    TeleportDevPortalForgotPasswordComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalForgotPasswordComponent.prototype.onRecoverPassword = function () {
        var _this = this;
        this.isBusy = true;
        this.logins.recoverPassword(this.userName.toLowerCase(), this.reCaptchaResponse)
            .then(function (resp) {
            console.log("Password Recovery Success", resp);
            _this.messages.info("Password Recovery Success", "An email will be sent with recovery instructions.");
            _this.router.navigateByUrl("/login").catch(function (err) { return console.error(err); });
        })
            .catch(function (err) {
            console.error("Password Recovery Failure", err);
            _this._resetCaptchaObserver.next(true);
            _this.isBusy = false;
            _this.messages.error("Password Recovery Failure", err.message, err);
        });
    };
    TeleportDevPortalForgotPasswordComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-forgot-password",
                    templateUrl: "forgot.html",
                },] },
    ];
    TeleportDevPortalForgotPasswordComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: login_service_1.LoginService, decorators: [{ type: core_1.Inject, args: [login_service_1.LoginService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalForgotPasswordComponent;
}());
exports.TeleportDevPortalForgotPasswordComponent = TeleportDevPortalForgotPasswordComponent;
//# sourceMappingURL=forgot.component.js.map