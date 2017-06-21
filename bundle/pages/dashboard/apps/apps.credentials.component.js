"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_service_1 = require("../../../services/application.service");
var modal_service_1 = require("../../../services/modal.service");
var TeleportDevPortalAppCredentialsComponent = (function () {
    function TeleportDevPortalAppCredentialsComponent(applications, modal) {
        this.applications = applications;
        this.modal = modal;
        this.isBusy = false;
        this.Credentials = [];
        console.log("new UIAppCredentials ()", this._app, arguments);
    }
    Object.defineProperty(TeleportDevPortalAppCredentialsComponent.prototype, "app", {
        set: function (a) {
            this.Credentials = a.credentials;
            this._app = a;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppCredentialsComponent.prototype.ngOnDestroy = function () {
        delete this._app;
        this.Credentials = [];
    };
    TeleportDevPortalAppCredentialsComponent.prototype.createCred = function () {
        var _this = this;
        this.isBusy = true;
        this.applications.createAppCredentials(this._app)
            .then(function (app) {
            _this.isBusy = false;
            _this.app = app;
        })
            .catch(function () { return _this.isBusy = false; });
    };
    TeleportDevPortalAppCredentialsComponent.prototype.deleteCred = function (cred) {
        var _this = this;
        this.modal.show("Delete Credential", "<p>Clicking OK will delete the \"" + cred.apiKey + "\" credential.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.isBusy = true;
                _this.applications.deleteAppCredentials(_this._app, cred)
                    .then(function () {
                    _this.isBusy = false;
                    _this.Credentials = _this.Credentials.filter(function (c) { return c.apiKey !== cred.apiKey; });
                })
                    .catch(function () { return _this.isBusy = false; });
            }
        });
    };
    TeleportDevPortalAppCredentialsComponent.prototype.apiKeyInputFocus = function (event) {
        event.target.type = "text";
        event.target.select();
    };
    TeleportDevPortalAppCredentialsComponent.prototype.apiKeyInputBlur = function (event) {
        event.target.type = "password";
    };
    TeleportDevPortalAppCredentialsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-credentials",
                    templateUrl: "apps.credentials.html",
                },] },
    ];
    TeleportDevPortalAppCredentialsComponent.ctorParameters = function () { return [
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
    ]; };
    TeleportDevPortalAppCredentialsComponent.propDecorators = {
        'app': [{ type: core_1.Input },],
    };
    return TeleportDevPortalAppCredentialsComponent;
}());
exports.TeleportDevPortalAppCredentialsComponent = TeleportDevPortalAppCredentialsComponent;
//# sourceMappingURL=apps.credentials.component.js.map