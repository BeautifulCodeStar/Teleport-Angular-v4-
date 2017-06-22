"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("../../../../services/account.service");
var user_service_1 = require("../../../../services/user.service");
var message_service_1 = require("../../../../services/message.service");
var modal_service_1 = require("../../../../services/modal.service");
var EmailValidator_1 = require("../../../../utils/EmailValidator");
var Permissions = require("../../../../utils/Permissions");
var TeleportDevPortalUserUpdateComponent = (function () {
    function TeleportDevPortalUserUpdateComponent(router, route, account, users, messages, modal) {
        this.router = router;
        this.route = route;
        this.account = account;
        this.users = users;
        this.messages = messages;
        this.modal = modal;
        this.isBusy = false;
        this.isEditing = false;
    }
    TeleportDevPortalUserUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isBusy = true;
        var userId = parseInt(this.route.snapshot.params.userId, 10);
        console.log("UIUserUpdate Init", userId);
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (dev) {
            _this._developer = dev;
            if (_this._developer.portalUser && _this._developer.portalUser.id === userId) {
                _this.messages.warning("That way madness lies!", "You cannot edit your own user here.");
                return _this.router.navigateByUrl("/apiv1/account/users");
            }
            if (["account.users.delete", "account.users.update"].some(function (p) {
                return Permissions.validate(dev.permissions, (_a = {}, _a[p] = true, _a));
                var _a;
            })) {
                _this.users.detail(userId)
                    .then(function (user) {
                    if (!Permissions.validate(dev.permissions, user.permissions)) {
                        _this.messages.warning("Your Permission Kung-Fu is Weak", "You do not have all the permissions required to edit this user.");
                        _this.router.navigateByUrl("/apiv1/account/users");
                        return;
                    }
                    _this._origUser = user;
                    _this._user = Object.assign({}, _this._origUser);
                    _this._user.permissions = Object.assign({}, _this._origUser.permissions);
                    _this.isBusy = false;
                })
                    .catch(function (err) {
                    _this.messages.error("Failed to Load User", err.message, err);
                    return _this.router.navigateByUrl("/apiv1/account/users");
                });
            }
            else {
                return _this.router.navigate(["/apiv1/access-denied"], { queryParams: { perms: "account.users.update account.users.delete" } });
            }
        });
    };
    TeleportDevPortalUserUpdateComponent.prototype.ngOnDestroy = function () {
        delete this._user;
    };
    Object.defineProperty(TeleportDevPortalUserUpdateComponent.prototype, "User", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalUserUpdateComponent.prototype.editUser = function () {
        this.isEditing = !!this._user;
    };
    TeleportDevPortalUserUpdateComponent.prototype.deleteUser = function () {
        var _this = this;
        this.modal.show("Delete Application", "<p>Clicking OK will delete the user \"" + this.User.firstName + " " + this.User.lastName + "\".</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (isOk) {
            if (isOk) {
                _this.isBusy = true;
                _this.users.remove(_this._user)
                    .then(function () {
                    _this.messages.warning("User Deleted", "Alas, poor " + _this._user.firstName + "! I knew him, " + _this._developer.firstName + ".");
                    return _this.router.navigate(["/apiv1/account/users"]);
                })
                    .catch(function (err) {
                    _this.isBusy = false;
                    _this.messages.error("User Delete Failed", "The following error occurred: " + err.message + ".", err);
                });
            }
        });
    };
    TeleportDevPortalUserUpdateComponent.prototype.isEmailValid = function () {
        return EmailValidator_1.EmailValidator.isValid(this.User.email);
    };
    TeleportDevPortalUserUpdateComponent.prototype.isUserValid = function () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    };
    TeleportDevPortalUserUpdateComponent.prototype.saveChanges = function () {
        var _this = this;
        if (!this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }
        this.isEditing = false;
        this.isBusy = true;
        this.users.update(this._user)
            .then(function (user) {
            _this._origUser = user;
            _this._user = Object.assign({}, _this._origUser);
            _this._user.permissions = Object.assign({}, _this._origUser.permissions);
            _this.isBusy = false;
            _this.messages.info("User Updated", "This user has been successfully updated.");
        })
            .catch(function (err) {
            _this.isBusy = false;
            _this.messages.error("User Update Failed", "The following error occurred: " + err.message + ".", err);
        });
    };
    TeleportDevPortalUserUpdateComponent.prototype.cancelChanges = function () {
        this.isEditing = false;
        this._user = Object.assign({}, this._origUser);
        this._user.permissions = Object.assign({}, this._origUser.permissions);
    };
    TeleportDevPortalUserUpdateComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-user-update",
                    templateUrl: "user.update.html",
                },] },
    ];
    TeleportDevPortalUserUpdateComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Inject, args: [router_1.ActivatedRoute,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: user_service_1.UserService, decorators: [{ type: core_1.Inject, args: [user_service_1.UserService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
        { type: modal_service_1.ModalService, decorators: [{ type: core_1.Inject, args: [modal_service_1.ModalService,] },] },
    ]; };
    return TeleportDevPortalUserUpdateComponent;
}());
exports.TeleportDevPortalUserUpdateComponent = TeleportDevPortalUserUpdateComponent;
//# sourceMappingURL=user.update.component.js.map