"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_service_1 = require("../../../../services/application.service");
var integrations_watson_service_1 = require("../../../../services/integrations.watson.service");
var modal_service_1 = require("../../../../services/modal.service");
var message_service_1 = require("../../../../services/message.service");
var TeleportDevPortalAppIntegrationWatsonComponent = (function () {
    function TeleportDevPortalAppIntegrationWatsonComponent(route, apps, watson, modal, message) {
        var _this = this;
        this.route = route;
        this.apps = apps;
        this.watson = watson;
        this.modal = modal;
        this.message = message;
        this.isBusy = false;
        this.isEditing = false;
        this.username = "";
        this.password = "";
        this.isBusy = true;
        this.route.params
            .filter(function (param) { return !!param.appId; })
            .forEach(function (param) {
            Promise.all([
                _this.apps.getAppByName(param.appId),
                _this.watson.getTextToSpeech(param.appId),
            ])
                .then(function (r) {
                _this._application = r[0];
                _this._watson = r[1];
                _this.cancel();
            })
                .catch(function (err) {
                _this.message.error("Watson Credentials Failure", err.message, err);
            });
        })
            .catch(function (err) { return console.error(err); });
    }
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.ngOnDestroy = function () {
        delete this._application;
        delete this._watson;
        this.isBusy = false;
        this.isEditing = false;
        this.username = "";
        this.password = "";
    };
    Object.defineProperty(TeleportDevPortalAppIntegrationWatsonComponent.prototype, "App", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppIntegrationWatsonComponent.prototype, "Watson", {
        get: function () {
            return this._watson;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.edit = function () {
        this.isEditing = true;
        this.username = this._watson && this._watson.textToSpeech && this._watson.textToSpeech.username || "";
        this.password = "";
    };
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.clear = function () {
        var _this = this;
        this.modal.show("Delete Watson Settings", "<p>Clicking OK will delete your Watson settings.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.isBusy = true;
                _this.watson.deleteTextToSpeech(_this.App.name)
                    .then(function (r) {
                    _this._watson = r;
                    _this.cancel();
                })
                    .catch(function (err) {
                    _this.cancel();
                    _this.message.error("Update Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.save = function () {
        var _this = this;
        this.isEditing = false;
        this.isBusy = true;
        var newWatson = {
            textToSpeech: {
                username: this.username,
                password: this.password,
            },
        };
        this.watson.putTextToSpeech(this.App.name, newWatson)
            .then(function (r) {
            _this._watson = r;
            _this.cancel();
        })
            .catch(function (err) {
            _this.cancel();
            _this.message.error("Update Failure", err.message, err);
        });
    };
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.cancel = function () {
        this.isBusy = false;
        this.isEditing = false;
        this.username = this._watson && this._watson.textToSpeech && this._watson.textToSpeech.username || "";
        this.password = this._watson.textToSpeech.password ? "**********" : "";
    };
    TeleportDevPortalAppIntegrationWatsonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-integrations-watson",
                    templateUrl: "apps.integrations.watson.html",
                },] },
    ];
    TeleportDevPortalAppIntegrationWatsonComponent.ctorParameters = function () { return [
        { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Inject, args: [router_1.ActivatedRoute,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: integrations_watson_service_1.IntegrationsWatsonService, decorators: [{ type: core_1.Inject, args: [integrations_watson_service_1.IntegrationsWatsonService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalAppIntegrationWatsonComponent;
}());
exports.TeleportDevPortalAppIntegrationWatsonComponent = TeleportDevPortalAppIntegrationWatsonComponent;
//# sourceMappingURL=apps.integrations.watson.component.js.map