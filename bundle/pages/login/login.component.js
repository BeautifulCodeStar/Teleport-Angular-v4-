import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/first";
import { Store } from "@ngrx/store";
import { session } from "teleport-module-services/services/ngrx";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import { MessageService } from "../../services/message.service";
import PasswordUtil from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";
var TeleportDevPortalLoginComponent = (function () {
    function TeleportDevPortalLoginComponent(logins, messages, store$) {
        this.logins = logins;
        this.messages = messages;
        this.store$ = store$;
        this.userName = "";
        this.passWord = "";
        this.isBusy = new BehaviorSubject(false);
        this.userLogins = new BehaviorSubject([]);
    }
    TeleportDevPortalLoginComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalLoginComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalLoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isBusy.next(true);
        this.logins.login({ userName: this.userName, password: this.passWord })
            .first()
            .subscribe(function (res) {
            if (res.v1.length === 1) {
                _this.loginAs(res.v1[0]);
                return;
            }
            _this.userLogins.next(res.v1);
            _this.isBusy.next(false);
        }, function (err) {
            _this.userLogins.next([]);
            _this.isBusy.next(false);
            _this.messages.error("Login Failure", "The username/password combination was not provided.", err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.loginAs = function (req) {
        var _this = this;
        this.isBusy.next(true);
        this.logins.loginAs(req)
            .first()
            .subscribe(function (res) {
            console.log("Login Success", res);
            _this.messages.info("Welcome, " + res.userData.firstName + ".", "You are now logged in to your account.");
            _this.store$.dispatch(new session.actions.LoginAsSuccess(res));
        }, function (err) {
            console.error("Login Failure", err);
            _this.isBusy.next(false);
            _this.closeMultiLogin();
            _this.messages.error("Login Failure", "The selected user failed to authenticate.", err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.closeMultiLogin = function () {
        this.userLogins.next([]);
    };
    TeleportDevPortalLoginComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-login",
                    templateUrl: "login.html",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    TeleportDevPortalLoginComponent.ctorParameters = function () { return [
        { type: LoginService, decorators: [{ type: Inject, args: [LoginService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalLoginComponent;
}());
export { TeleportDevPortalLoginComponent };
//# sourceMappingURL=login.component.js.map