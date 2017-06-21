"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recaptcha_component_1 = require("./recaptcha/recaptcha.component");
var DevPortalComponentsModule = (function () {
    function DevPortalComponentsModule() {
    }
    DevPortalComponentsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        recaptcha_component_1.TeleportReCaptchaComponent,
                    ],
                    exports: [
                        recaptcha_component_1.TeleportReCaptchaComponent,
                    ],
                },] },
    ];
    DevPortalComponentsModule.ctorParameters = function () { return []; };
    return DevPortalComponentsModule;
}());
exports.DevPortalComponentsModule = DevPortalComponentsModule;
//# sourceMappingURL=components.module.js.map