"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var login_service_1 = require("../../services/login.service");
var message_service_1 = require("../../services/message.service");
var PasswordUtil_1 = require("../../utils/PasswordUtil");
var EmailValidator_1 = require("../../utils/EmailValidator");
var TeleportDevPortalLoginComponent = (function () {
    function TeleportDevPortalLoginComponent(logins, messages) {
        var _this = this;
        this.logins = logins;
        this.messages = messages;
        this.userName = "";
        this.passWord = "";
        this.isBusy = false;
        this.isCaptchaOk = false;
        this.showMultiLogin = false;
        this.reCaptchaResponse = "";
        this._resetCaptchaObservable = Observable_1.Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    }
    TeleportDevPortalLoginComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil_1.default.satisfies(pw);
    };
    TeleportDevPortalLoginComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalLoginComponent.prototype.onCaptcha = function (resp, isOk) {
        this.reCaptchaResponse = resp;
        this.isCaptchaOk = isOk;
    };
    TeleportDevPortalLoginComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalLoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isBusy = true;
        this.logins.login(this.userName, this.passWord, this.reCaptchaResponse)
            .then(function (res) {
            console.log("LOGIN =>", res);
            if (res.developer) {
                console.log("Login Success", res.developer);
                _this.messages.info("Welcome, " + res.developer.firstName + ".", "You are now logged in to your account.");
            }
            else if (res.possibleLogins) {
                _this._resetCaptchaObserver.next(true);
                _this.isCaptchaOk = false;
                _this.isBusy = false;
                _this.showMultiLogin = true;
                _this.devLogin = res.possibleLogins.find(function (d) { return d.id === d.developerId; });
                _this.userLogins = res.possibleLogins.filter(function (d) { return d.id !== d.developerId; });
            }
        })
            .catch(function (err) {
            console.error("Login Failure", err);
            _this._resetCaptchaObserver.next(true);
            _this.isCaptchaOk = false;
            _this.isBusy = false;
            _this.messages.error("Login Failure", err.message, err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.loginAs = function (dev) {
        var _this = this;
        this.isBusy = true;
        this.logins.loginAs(this.userName, this.passWord, dev.id, dev.authCode)
            .then(function (d) {
            console.log("Login Success", d);
            _this.messages.info("Welcome, " + d.firstName + ".", "You are now logged in to your account.");
        })
            .catch(function (err) {
            console.error("Login Failure", err);
            _this._resetCaptchaObserver.next(true);
            _this.isCaptchaOk = false;
            _this.isBusy = false;
            _this.closeMultiLogin();
            _this.messages.error("Login Failure", err.message, err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.closeMultiLogin = function () {
        this.showMultiLogin = false;
        delete this.devLogin;
        delete this.userLogins;
    };
    TeleportDevPortalLoginComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-login",
                    templateUrl: "login.html",
                },] },
    ];
    TeleportDevPortalLoginComponent.ctorParameters = function () { return [
        { type: login_service_1.LoginService, decorators: [{ type: core_1.Inject, args: [login_service_1.LoginService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalLoginComponent;
}());
exports.TeleportDevPortalLoginComponent = TeleportDevPortalLoginComponent;
//# sourceMappingURL=login.component.js.map