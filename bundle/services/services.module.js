"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("./login.service");
var message_service_1 = require("./message.service");
var modal_service_1 = require("./modal.service");
var account_credentials_service_1 = require("./account.credentials.service");
var account_service_1 = require("./account.service");
var alerts_service_1 = require("./alerts.service");
var application_service_1 = require("./application.service");
var billing_service_1 = require("./billing.service");
var integrations_aws_service_1 = require("./integrations.aws.service");
var integrations_watson_service_1 = require("./integrations.watson.service");
var logs_service_1 = require("./logs.service");
var perms_guard_service_1 = require("./perms-guard.service");
var session_service_1 = require("./session.service");
var top_up_service_1 = require("./top-up.service");
var usage_service_1 = require("./usage.service");
var user_service_1 = require("./user.service");
var DevPortalServicesModule = (function () {
    function DevPortalServicesModule() {
    }
    DevPortalServicesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        account_credentials_service_1.AccountCredentialsService,
                        account_service_1.AccountService,
                        alerts_service_1.AlertsService,
                        application_service_1.ApplicationService,
                        billing_service_1.BillingService,
                        integrations_aws_service_1.IntegrationsAWSService,
                        integrations_watson_service_1.IntegrationsWatsonService,
                        login_service_1.LoginService,
                        logs_service_1.LogsService,
                        message_service_1.MessageService,
                        modal_service_1.ModalService,
                        perms_guard_service_1.PermsGuardCanActivate,
                        session_service_1.SessionService,
                        top_up_service_1.TopUpService,
                        usage_service_1.UsageService,
                        user_service_1.UserService,
                    ],
                },] },
    ];
    DevPortalServicesModule.ctorParameters = function () { return []; };
    return DevPortalServicesModule;
}());
exports.DevPortalServicesModule = DevPortalServicesModule;
//# sourceMappingURL=services.module.js.map