"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var components_module_1 = require("../../../../components/components.module");
var role_picker_component_1 = require("./role-picker.component");
var RolePickerModule = (function () {
    function RolePickerModule() {
    }
    RolePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        animations_1.BrowserAnimationsModule,
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        router_1.RouterModule,
                        components_module_1.DevPortalComponentsModule,
                    ],
                    declarations: [
                        role_picker_component_1.TeleportDevPortalRolePickerComponent,
                        role_picker_component_1.TeleportDevPortalRolePickerRowComponent,
                    ],
                    exports: [
                        role_picker_component_1.TeleportDevPortalRolePickerComponent,
                        role_picker_component_1.TeleportDevPortalRolePickerRowComponent,
                    ],
                },] },
    ];
    RolePickerModule.ctorParameters = function () { return []; };
    return RolePickerModule;
}());
exports.RolePickerModule = RolePickerModule;
//# sourceMappingURL=role-picker.module.js.map