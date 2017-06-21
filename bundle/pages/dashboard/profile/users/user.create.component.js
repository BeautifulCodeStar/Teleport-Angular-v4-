"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("../../../../services/account.service");
var user_service_1 = require("../../../../services/user.service");
var message_service_1 = require("../../../../services/message.service");
var EmailValidator_1 = require("../../../../utils/EmailValidator");
var Permissions = require("../../../../utils/Permissions");
var TeleportDevPortalUserCreateComponent = (function () {
    function TeleportDevPortalUserCreateComponent(router, account, users, messages) {
        this.router = router;
        this.account = account;
        this.users = users;
        this.messages = messages;
        this.isBusy = false;
        this.isSendInvite = true;
    }
    TeleportDevPortalUserCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (dev) {
            _this._developer = dev;
            if (Permissions.validate(dev.permissions, { "account.users.create": true })) {
                _this.User = {
                    id: 0,
                    developerId: "",
                    createdOn: new Date(),
                    status: "unverified",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
                    permissions: Object.assign({}, dev.permissions),
                    phoneNo: "",
                    position: "",
                    notes: "",
                };
                _this.isBusy = false;
            }
            else {
                return _this.router.navigate(["/apiv1/access-denied"], { queryParams: { perms: "account.users.create" } });
            }
        });
    };
    TeleportDevPortalUserCreateComponent.prototype.ngOnDestroy = function () {
        console.log("UIUserCreate Destroy");
        delete this._developer;
        delete this.User;
    };
    TeleportDevPortalUserCreateComponent.prototype.isEmailValid = function () {
        return EmailValidator_1.EmailValidator.isValid(this.User.email);
    };
    TeleportDevPortalUserCreateComponent.prototype.isUserValid = function () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    };
    TeleportDevPortalUserCreateComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }
        this.isBusy = true;
        this.users.create(this.User)
            .then(function (user) {
            _this.messages.info("User Created", "The new user was successfully created.");
            if (_this.isSendInvite) {
                _this.users.sendInvite(user);
                _this.messages.info("Email Invite Sent", "An email invitation has been sent to the user.");
            }
            _this.router.navigateByUrl("/apiv1/account/users").catch(function (err) { return console.error(err); });
        })
            .catch(function (err) {
            _this.isBusy = false;
            _this.messages.error("New User Failure", "An unexpected error prevented the user from being created. Try again or contact support.", err);
        });
    };
    TeleportDevPortalUserCreateComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-create",
                    templateUrl: "user.create.html",
                },] },
    ];
    TeleportDevPortalUserCreateComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: user_service_1.UserService, decorators: [{ type: core_1.Inject, args: [user_service_1.UserService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalUserCreateComponent;
}());
exports.TeleportDevPortalUserCreateComponent = TeleportDevPortalUserCreateComponent;
//# sourceMappingURL=user.create.component.js.map