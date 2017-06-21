"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var account_credentials_service_1 = require("../../../services/account.credentials.service");
var message_service_1 = require("../../../services/message.service");
var modal_service_1 = require("../../../services/modal.service");
var TeleportDevPortalProfileBasicAuthComponent = (function () {
    function TeleportDevPortalProfileBasicAuthComponent(account, creds, modal, messages) {
        this.account = account;
        this.creds = creds;
        this.modal = modal;
        this.messages = messages;
        this.isBusy = false;
        this.Credentials = [];
        console.log("new UIProfileBasicAuth ()", this._userId);
        this.isBusy = true;
    }
    TeleportDevPortalProfileBasicAuthComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.isBusy = true;
        this.account.Observable
            .first(function (acct) { return !!acct; })
            .subscribe(function (dev) {
            _this._userId = dev.portalUser ? dev.portalUser.developerId : dev.id;
            _this.creds.list(_this._userId)
                .then(function (auths) {
                _this.Credentials = auths.map(function (a) { return ({
                    userName: a.userName,
                    password: a.password,
                    authorization: "Basic " + btoa(a.userName + ":" + a.password),
                }); });
                _this.isBusy = false;
            })
                .catch(function (err) {
                console.error(err.stack);
                _this.messages.error("Credentials Not Found", "Your Basic Auth credentials were not loaded.");
                _this.isBusy = false;
            });
        });
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.ngOnDestroy = function () {
        delete this.Credentials;
        delete this._userId;
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.create = function () {
        var _this = this;
        this.isBusy = true;
        this.creds.create(this._userId)
            .then(function (auths) {
            _this.Credentials = auths.map(function (a) { return ({
                userName: a.userName,
                password: a.password,
                authorization: "Basic " + btoa(a.userName + ":" + a.password),
            }); });
            _this.isBusy = false;
        })
            .catch(function (err) {
            console.error(err.stack);
            _this.messages.error("Create Credentials Failure", "Your new Basic Auth credentials were not created.");
            _this.isBusy = false;
        });
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.remove = function (cred) {
        var _this = this;
        this.modal.show("Delete Credential", "<p>Clicking OK will delete the Basic Auth credential.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.isBusy = true;
                _this.creds.remove(_this._userId, cred.password)
                    .then(function (auths) {
                    _this.Credentials = auths.map(function (a) { return ({
                        userName: a.userName,
                        password: a.password,
                        authorization: "Basic " + btoa(a.userName + ":" + a.password),
                    }); });
                    _this.isBusy = false;
                })
                    .catch(function (err) {
                    console.error(err.stack);
                    _this.messages.error("Remove Credentials Failure", "Your Basic Auth credentials were not removed.");
                    _this.isBusy = false;
                });
            }
        });
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.apiKeyInputFocus = function (event) {
        event.target.type = "text";
        event.target.select();
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.apiKeyInputBlur = function (event) {
        event.target.type = "password";
    };
    TeleportDevPortalProfileBasicAuthComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-dashboard-profile-basic-auth",
                    templateUrl: "profile.basic-auth.html",
                },] },
    ];
    TeleportDevPortalProfileBasicAuthComponent.ctorParameters = function () { return [
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: account_credentials_service_1.AccountCredentialsService, decorators: [{ type: core_1.Inject, args: [account_credentials_service_1.AccountCredentialsService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalProfileBasicAuthComponent;
}());
exports.TeleportDevPortalProfileBasicAuthComponent = TeleportDevPortalProfileBasicAuthComponent;
//# sourceMappingURL=profile.basic-auth.component.js.map