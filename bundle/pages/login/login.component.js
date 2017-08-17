import { Component, Inject } from "@angular/core";
import "rxjs/add/operator/toPromise";
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
        this.isBusy = false;
    }
    TeleportDevPortalLoginComponent.prototype.ngOnInit = function () {
        this.userLogins = undefined;
        this.userName = "";
        this.passWord = "";
        this.isBusy = false;
    };
    TeleportDevPortalLoginComponent.prototype.ngOnDestroy = function () {
        this.userLogins = undefined;
        this.userName = "";
        this.passWord = "";
        this.isBusy = false;
    };
    TeleportDevPortalLoginComponent.prototype.isPasswordValid = function (pw) {
        return PasswordUtil.satisfies(pw);
    };
    TeleportDevPortalLoginComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalLoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isBusy = true;
        this.logins.login({ userName: this.userName, password: this.passWord })
            .toPromise()
            .then(function (res) {
            if (res.v1.length === 1) {
                _this.loginAs(res.v1[0]);
                return;
            }
            _this.userLogins = res.v1;
            _this.isBusy = false;
        })
            .catch(function (err) {
            _this.isBusy = false;
            _this.messages.error("Login Failure", "The username/password combination was not provided.", err);
        });
    };
    TeleportDevPortalLoginComponent.prototype.loginAs = function (req) {
        this.isBusy = true;
        this.store$.dispatch(new session.actions.LoginAs(req));
    };
    TeleportDevPortalLoginComponent.prototype.closeMultiLogin = function () {
        this.userLogins = undefined;
    };
    TeleportDevPortalLoginComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-login",
                    templateUrl: "login.html",
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