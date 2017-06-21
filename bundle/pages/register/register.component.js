"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("../../services/login.service");
var message_service_1 = require("../../services/message.service");
var PasswordUtil_1 = require("../../utils/PasswordUtil");
var EmailValidator_1 = require("../../utils/EmailValidator");
var Observable_1 = require("rxjs/Observable");
var TeleportDevPortalRegisterComponent = (function () {
    function TeleportDevPortalRegisterComponent(logins, messages) {
        this.logins = logins;
        this.messages = messages;
        this.form = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordVerify: "",
            phoneNo: "",
            company: "",
            interests: {},
            "g-recaptcha-response": "",
        };
        this.isSubmitted = false;
        this.isSuccess = false;
        this.isCaptchaOk = false;
    }
    TeleportDevPortalRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._resetCaptchaObservable = Observable_1.Observable.create(function (observer) { return _this._resetCaptchaObserver = observer; });
    };
    TeleportDevPortalRegisterComponent.prototype.ngOnDestroy = function () {
        if (this._resetCaptchaObserver) {
            this._resetCaptchaObserver.complete();
        }
    };
    TeleportDevPortalRegisterComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil_1.default.satisfies(pw);
    };
    TeleportDevPortalRegisterComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalRegisterComponent.prototype.passwordsMatch = function () {
        return this.form.password.length > 0 && this.form.password === this.form.passwordVerify;
    };
    TeleportDevPortalRegisterComponent.prototype.onCaptcha = function (token, val) {
        this.form["g-recaptcha-response"] = token;
        this.isCaptchaOk = val;
    };
    TeleportDevPortalRegisterComponent.prototype.resetCaptchaObservable = function () {
        return this._resetCaptchaObservable;
    };
    TeleportDevPortalRegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.form.password || !this.form.passwordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }
        if (this.form.password !== this.form.passwordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }
        if (!PasswordUtil_1.default.satisfies(this.form.password)) {
            this.messages.warning("Invalid Password", "Your password must be at least 8 characters and contain caps, lowercase, numbers and special characters.");
            return;
        }
        this.isSubmitted = true;
        this.logins.register(this.form)
            .then(function (dev) {
            console.log("Registration Success", dev);
            _this.isSuccess = true;
            _this.isSubmitted = false;
        })
            .catch(function (err) {
            console.error("Registration failure.", err);
            _this.isSuccess = false;
            _this.isSubmitted = false;
            _this._resetCaptchaObserver.next(true);
            _this.messages.error("Registration Failed", err.message);
        });
    };
    TeleportDevPortalRegisterComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-register",
                    templateUrl: "register.html",
                },] },
    ];
    TeleportDevPortalRegisterComponent.ctorParameters = function () { return [
        { type: login_service_1.LoginService, decorators: [{ type: core_1.Inject, args: [login_service_1.LoginService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalRegisterComponent;
}());
exports.TeleportDevPortalRegisterComponent = TeleportDevPortalRegisterComponent;
//# sourceMappingURL=register.component.js.map