"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var components_module_1 = require("./components/components.module");
var pages_module_1 = require("./pages/pages.module");
var services_module_1 = require("./services/services.module");
var devPortalUtils = require("./utils/index");
exports.devPortalUtils = devPortalUtils;
var devPortalModels = require("./models/index");
exports.devPortalModels = devPortalModels;
var devPortalServices = require("./services/index");
exports.devPortalServices = devPortalServices;
var DevPortalModule = (function () {
    function DevPortalModule() {
    }
    DevPortalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        animations_1.BrowserAnimationsModule,
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        components_module_1.DevPortalComponentsModule,
                        pages_module_1.DevPortalPagesModule,
                        services_module_1.DevPortalServicesModule,
                    ],
                    exports: [
                        components_module_1.DevPortalComponentsModule,
                        pages_module_1.DevPortalPagesModule,
                        services_module_1.DevPortalServicesModule,
                    ],
                },] },
    ];
    DevPortalModule.ctorParameters = function () { return []; };
    return DevPortalModule;
}());
exports.DevPortalModule = DevPortalModule;
//# sourceMappingURL=index.js.map