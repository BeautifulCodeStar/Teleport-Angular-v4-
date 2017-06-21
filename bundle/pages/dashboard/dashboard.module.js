"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var datepicker_1 = require("../../md2/datepicker");
var dateUtil_1 = require("../../md2/datepicker/dateUtil");
var role_picker_module_1 = require("./profile/users/role-picker.module");
var components_module_1 = require("../../components/components.module");
var services_module_1 = require("../../services/services.module");
var apps_credentials_component_1 = require("./apps/apps.credentials.component");
var profile_password_component_1 = require("./profile/profile.password.component");
var profile_basic_auth_component_1 = require("./profile/profile.basic-auth.component");
var support_component_1 = require("./support/support.component");
var data_logs_component_1 = require("./data/data.logs.component");
var data_usage_component_1 = require("./data/data.usage.component");
var apps_id_component_1 = require("./apps/apps.id.component");
var apps_create_component_1 = require("./apps/apps-create.component");
var apps_component_1 = require("./apps/apps.component");
var apps_integrations_aws_component_1 = require("./apps/integrations/apps.integrations.aws.component");
var apps_integrations_watson_component_1 = require("./apps/integrations/apps.integrations.watson.component");
var billing_settings_component_1 = require("./billing/billing.settings.component");
var billing_payment_component_1 = require("./billing/billing.payment.component");
var billing_component_1 = require("./billing/billing.component");
var top_up_component_1 = require("./top-up/top-up.component");
var profile_alerts_create_component_1 = require("./profile/profile.alerts.create.component");
var profile_alerts_component_1 = require("./profile/profile.alerts.component");
var profile_component_1 = require("./profile/profile.component");
var profile_user_component_1 = require("./profile/profile.user.component");
var logout_component_1 = require("./logout/logout.component");
var users_component_1 = require("./profile/users/users.component");
var user_create_component_1 = require("./profile/users/user.create.component");
var user_update_component_1 = require("./profile/users/user.update.component");
var access_component_1 = require("./access-denied/access.component");
var access_directive_1 = require("./access-denied/access.directive");
var DevPortalDashboardModule = (function () {
    function DevPortalDashboardModule() {
    }
    DevPortalDashboardModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        animations_1.BrowserAnimationsModule,
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        router_1.RouterModule,
                        role_picker_module_1.RolePickerModule,
                        datepicker_1.Md2DatepickerModule,
                        components_module_1.DevPortalComponentsModule,
                        services_module_1.DevPortalServicesModule,
                    ],
                    declarations: [
                        access_directive_1.AllowAccessDirective,
                        apps_credentials_component_1.TeleportDevPortalAppCredentialsComponent,
                        profile_password_component_1.TeleportDevPortalProfilePasswordComponent,
                        profile_password_component_1.TeleportDevPortalUserProfilePasswordComponent,
                        profile_basic_auth_component_1.TeleportDevPortalProfileBasicAuthComponent,
                        support_component_1.TeleportDevPortalSupportFormComponent,
                        data_logs_component_1.TeleportDevPortalDataLogsComponent,
                        data_usage_component_1.TeleportDevPortalDataUsageComponent,
                        apps_id_component_1.TeleportDevPortalAppByIdComponent,
                        apps_create_component_1.TeleportDevPortalAppsCreateComponent,
                        apps_component_1.TeleportDevPortalAppsComponent,
                        apps_integrations_aws_component_1.TeleportDevPortalAppIntegrationAwsComponent,
                        apps_integrations_watson_component_1.TeleportDevPortalAppIntegrationWatsonComponent,
                        billing_settings_component_1.TeleportDevPortalBillingSettingsComponent,
                        billing_payment_component_1.TeleportDevPortalBillingPaymentComponent,
                        billing_component_1.TeleportDevPortalBillingComponent,
                        top_up_component_1.TeleportDevPortalTopUpComponent,
                        profile_alerts_create_component_1.TeleportDevPortalProfileAlertsCreateComponent,
                        profile_alerts_component_1.TeleportDevPortalProfileAlertsComponent,
                        profile_component_1.TeleportDevPortalProfileComponent,
                        profile_user_component_1.TeleportDevPortalUserProfileComponent,
                        logout_component_1.TeleportDevPortalLogoutComponent,
                        users_component_1.TeleportDevPortalUsersComponent,
                        user_create_component_1.TeleportDevPortalUserCreateComponent,
                        user_update_component_1.TeleportDevPortalUserUpdateComponent,
                        access_component_1.TeleportDevPortalAccessDeniedComponent,
                    ],
                    providers: [
                        dateUtil_1.Md2DateUtil,
                    ],
                    exports: [
                        role_picker_module_1.RolePickerModule,
                        datepicker_1.Md2DatepickerModule,
                        components_module_1.DevPortalComponentsModule,
                        access_directive_1.AllowAccessDirective,
                        apps_credentials_component_1.TeleportDevPortalAppCredentialsComponent,
                        profile_password_component_1.TeleportDevPortalProfilePasswordComponent,
                        profile_password_component_1.TeleportDevPortalUserProfilePasswordComponent,
                        profile_basic_auth_component_1.TeleportDevPortalProfileBasicAuthComponent,
                        support_component_1.TeleportDevPortalSupportFormComponent,
                        data_logs_component_1.TeleportDevPortalDataLogsComponent,
                        data_usage_component_1.TeleportDevPortalDataUsageComponent,
                        apps_id_component_1.TeleportDevPortalAppByIdComponent,
                        apps_create_component_1.TeleportDevPortalAppsCreateComponent,
                        apps_component_1.TeleportDevPortalAppsComponent,
                        apps_integrations_aws_component_1.TeleportDevPortalAppIntegrationAwsComponent,
                        apps_integrations_watson_component_1.TeleportDevPortalAppIntegrationWatsonComponent,
                        billing_settings_component_1.TeleportDevPortalBillingSettingsComponent,
                        billing_payment_component_1.TeleportDevPortalBillingPaymentComponent,
                        billing_component_1.TeleportDevPortalBillingComponent,
                        top_up_component_1.TeleportDevPortalTopUpComponent,
                        profile_alerts_create_component_1.TeleportDevPortalProfileAlertsCreateComponent,
                        profile_alerts_component_1.TeleportDevPortalProfileAlertsComponent,
                        profile_component_1.TeleportDevPortalProfileComponent,
                        profile_user_component_1.TeleportDevPortalUserProfileComponent,
                        logout_component_1.TeleportDevPortalLogoutComponent,
                        users_component_1.TeleportDevPortalUsersComponent,
                        user_create_component_1.TeleportDevPortalUserCreateComponent,
                        user_update_component_1.TeleportDevPortalUserUpdateComponent,
                        access_component_1.TeleportDevPortalAccessDeniedComponent,
                    ],
                },] },
    ];
    DevPortalDashboardModule.ctorParameters = function () { return []; };
    return DevPortalDashboardModule;
}());
exports.DevPortalDashboardModule = DevPortalDashboardModule;
//# sourceMappingURL=dashboard.module.js.map