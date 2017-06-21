"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_service_1 = require("../../../../services/application.service");
var integrations_aws_service_1 = require("../../../../services/integrations.aws.service");
var modal_service_1 = require("../../../../services/modal.service");
var message_service_1 = require("../../../../services/message.service");
var TeleportDevPortalAppIntegrationAwsComponent = (function () {
    function TeleportDevPortalAppIntegrationAwsComponent(route, apps, aws, modal, message) {
        var _this = this;
        this.route = route;
        this.apps = apps;
        this.aws = aws;
        this.modal = modal;
        this.message = message;
        this.isBusy = false;
        this.isEditing = false;
        this.accessKey = "";
        this.securityKey = "";
        this.bucket = "";
        this.region = "";
        this.isBusy = true;
        this.route.params
            .filter(function (param) { return !!param.appId; })
            .forEach(function (param) {
            Promise.all([
                _this.apps.getAppByName(param.appId),
                _this.aws.getAWS(param.appId),
            ])
                .then(function (r) {
                _this._application = r[0];
                _this._aws = r[1];
                _this.cancel();
            })
                .catch(function (err) {
                _this.message.error("AWS Credentials Failure", err.message, err);
            });
        })
            .catch(function (err) { return console.error(err); });
    }
    TeleportDevPortalAppIntegrationAwsComponent.prototype.ngOnDestroy = function () {
        delete this._application;
        delete this._aws;
        this.isBusy = false;
        this.isEditing = false;
        this.accessKey = "";
        this.securityKey = "";
        this.bucket = "";
        this.region = "";
    };
    Object.defineProperty(TeleportDevPortalAppIntegrationAwsComponent.prototype, "App", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppIntegrationAwsComponent.prototype, "AWS", {
        get: function () {
            return this._aws;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppIntegrationAwsComponent.prototype.edit = function () {
        this.isEditing = true;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    };
    TeleportDevPortalAppIntegrationAwsComponent.prototype.clear = function () {
        var _this = this;
        this.modal.show("Delete AWS Settings", "<p>Clicking OK will delete your AWS settings.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.isBusy = true;
                _this.aws.deleteAWS(_this.App.name)
                    .then(function (r) {
                    _this._aws = r;
                    _this.cancel();
                })
                    .catch(function (err) {
                    _this.cancel();
                    _this.message.error("Update Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalAppIntegrationAwsComponent.prototype.save = function () {
        var _this = this;
        this.isEditing = false;
        this.isBusy = true;
        var newAWS = {
            accessKey: this.accessKey,
            securityKey: this.securityKey,
            s3: {
                bucket: this.bucket,
                region: this.region,
            },
        };
        this.aws.putAWS(this.App.name, newAWS)
            .then(function (r) {
            _this._aws = r;
            _this.cancel();
        })
            .catch(function (err) {
            _this.cancel();
            _this.message.error("Update Failure", err.message, err);
        });
    };
    TeleportDevPortalAppIntegrationAwsComponent.prototype.cancel = function () {
        this.isBusy = false;
        this.isEditing = false;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = this._aws.securityKey ? "**********" : "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    };
    TeleportDevPortalAppIntegrationAwsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-integrations-aws",
                    templateUrl: "apps.integrations.aws.html",
                },] },
    ];
    TeleportDevPortalAppIntegrationAwsComponent.ctorParameters = function () { return [
        { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Inject, args: [router_1.ActivatedRoute,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: integrations_aws_service_1.IntegrationsAWSService, decorators: [{ type: core_1.Inject, args: [integrations_aws_service_1.IntegrationsAWSService,] },] },
        { type: modal_service_1.Modal.Service, decorators: [{ type: core_1.Inject, args: [modal_service_1.Modal.Service,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalAppIntegrationAwsComponent;
}());
exports.TeleportDevPortalAppIntegrationAwsComponent = TeleportDevPortalAppIntegrationAwsComponent;
//# sourceMappingURL=apps.integrations.aws.component.js.map