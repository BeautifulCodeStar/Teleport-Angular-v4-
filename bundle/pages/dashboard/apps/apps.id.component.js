"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_service_1 = require("../../../services/application.service");
var modal_service_1 = require("../../../services/modal.service");
var TeleportDevPortalAppByIdComponent = (function () {
    function TeleportDevPortalAppByIdComponent(router, apps, modal, route) {
        this.router = router;
        this.apps = apps;
        this.modal = modal;
        this.route = route;
        this.isBusy = false;
        this.isEditing = false;
        this.appName = "";
        this.appNotes = "";
    }
    TeleportDevPortalAppByIdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .filter(function (param) { return !!param.appId; })
            .forEach(function (param) {
            _this.isBusy = true;
            _this.apps.getAppByName(param.appId)
                .then(function (app) {
                _this.appName = app.friendlyName;
                _this.appNotes = app.notes;
                _this._application = app;
                _this.isBusy = false;
            });
        })
            .catch(function (err) { return console.error(err); });
    };
    TeleportDevPortalAppByIdComponent.prototype.ngOnDestroy = function () {
        delete this._application;
        this.isBusy = false;
        this.isEditing = false;
        this.appName = "";
        this.appNotes = "";
    };
    Object.defineProperty(TeleportDevPortalAppByIdComponent.prototype, "App", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppByIdComponent.prototype.editApp = function () {
        if (this._application) {
            this.isEditing = true;
            this.appName = this._application.friendlyName;
            this.appNotes = this._application.notes;
        }
    };
    TeleportDevPortalAppByIdComponent.prototype.deleteApp = function () {
        var _this = this;
        this.modal.show("Delete Application", "<p>Clicking OK will delete \"" + this.App.friendlyName + "\".</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.isBusy = true;
                _this.apps.deleteApp(_this.App)
                    .then(function () { return _this.router.navigate(["/apiv1/applications"]); })
                    .catch(function () { return _this.isBusy = false; });
            }
        });
    };
    TeleportDevPortalAppByIdComponent.prototype.saveChanges = function () {
        var _this = this;
        this.isEditing = false;
        this.isBusy = true;
        this.apps.updateApp(this.App, this.appName, this.appNotes)
            .then(function (app) {
            _this._application = app;
            _this.isBusy = false;
        })
            .catch(function () { return _this.isBusy = false; });
    };
    TeleportDevPortalAppByIdComponent.prototype.cancelChanges = function () {
        this.isEditing = false;
    };
    TeleportDevPortalAppByIdComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-detail",
                    templateUrl: "apps.id.html",
                },] },
    ];
    TeleportDevPortalAppByIdComponent.ctorParameters = function () { return [
        { type: router_1.Router, decorators: [{ type: core_1.Inject, args: [router_1.Router,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: modal_service_1.ModalService, decorators: [{ type: core_1.Inject, args: [modal_service_1.ModalService,] },] },
        { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Inject, args: [router_1.ActivatedRoute,] },] },
    ]; };
    return TeleportDevPortalAppByIdComponent;
}());
exports.TeleportDevPortalAppByIdComponent = TeleportDevPortalAppByIdComponent;
//# sourceMappingURL=apps.id.component.js.map