"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var forgot_component_1 = require("./forgot-password/forgot.component");
var login_component_1 = require("./login/login.component");
var recover_component_1 = require("./recover-password/recover.component");
var register_component_1 = require("./register/register.component");
var DevPortalPagesModule = (function () {
    function DevPortalPagesModule() {
    }
    DevPortalPagesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        animations_1.BrowserAnimationsModule,
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        router_1.RouterModule,
                        dashboard_module_1.DevPortalDashboardModule,
                    ],
                    declarations: [
                        forgot_component_1.TeleportDevPortalForgotPasswordComponent,
                        login_component_1.TeleportDevPortalLoginComponent,
                        recover_component_1.TeleportDevPortalRecoverPasswordComponent,
                        register_component_1.TeleportDevPortalRegisterComponent,
                    ],
                    exports: [
                        dashboard_module_1.DevPortalDashboardModule,
                        forgot_component_1.TeleportDevPortalForgotPasswordComponent,
                        login_component_1.TeleportDevPortalLoginComponent,
                        recover_component_1.TeleportDevPortalRecoverPasswordComponent,
                        register_component_1.TeleportDevPortalRegisterComponent,
                    ],
                },] },
    ];
    DevPortalPagesModule.ctorParameters = function () { return []; };
    return DevPortalPagesModule;
}());
exports.DevPortalPagesModule = DevPortalPagesModule;
//# sourceMappingURL=pages.module.js.map