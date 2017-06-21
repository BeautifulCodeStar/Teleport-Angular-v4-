"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_service_1 = require("../../../../services/account.service");
var user_service_1 = require("../../../../services/user.service");
var message_service_1 = require("../../../../services/message.service");
var Permissions = require("../../../../utils/Permissions");
var TeleportDevPortalUsersComponent = (function () {
    function TeleportDevPortalUsersComponent(account, users, messages) {
        this.account = account;
        this.users = users;
        this.messages = messages;
        this.isBusy = false;
    }
    TeleportDevPortalUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
        this.users.list()
            .then(function (users) {
            _this.isBusy = false;
            _this._users = users;
        })
            .catch(function (err) {
            console.error(err);
            _this.isBusy = false;
            _this.messages.error("Failed to Load User List", err.message, err);
        });
    };
    TeleportDevPortalUsersComponent.prototype.ngOnDestroy = function () {
        delete this._users;
    };
    Object.defineProperty(TeleportDevPortalUsersComponent.prototype, "Users", {
        get: function () {
            return this._users;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalUsersComponent.prototype.isEditable = function (user) {
        if (this._developer.portalUser && this._developer.portalUser.id === user.id) {
            return false;
        }
        return this._developer && Permissions.validate(this._developer.permissions, user.permissions);
    };
    TeleportDevPortalUsersComponent.prototype.resendInvite = function (user) {
        var _this = this;
        this.users.sendInvite(user)
            .then(function () {
            _this.messages.info("User Invite Resent", "Perhaps they'll get it this time.");
        })
            .catch(function (err) {
            _this.messages.error("User Invite Failed to Send", "An unexpected error prevented the invite from being sent. Try again.", err);
        });
    };
    TeleportDevPortalUsersComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-users",
                    templateUrl: "users.html",
                },] },
    ];
    TeleportDevPortalUsersComponent.ctorParameters = function () { return [
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: user_service_1.UserService, decorators: [{ type: core_1.Inject, args: [user_service_1.UserService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalUsersComponent;
}());
exports.TeleportDevPortalUsersComponent = TeleportDevPortalUsersComponent;
//# sourceMappingURL=users.component.js.map