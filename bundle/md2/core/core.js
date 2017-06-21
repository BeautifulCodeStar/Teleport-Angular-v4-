"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var portal_directives_1 = require("./portal/portal-directives");
var overlay_directives_1 = require("./overlay/overlay-directives");
var portal_1 = require("./portal/portal");
exports.Portal = portal_1.Portal;
exports.BasePortalHost = portal_1.BasePortalHost;
exports.ComponentPortal = portal_1.ComponentPortal;
exports.TemplatePortal = portal_1.TemplatePortal;
var portal_directives_2 = require("./portal/portal-directives");
exports.PortalHostDirective = portal_directives_2.PortalHostDirective;
exports.TemplatePortalDirective = portal_directives_2.TemplatePortalDirective;
exports.PortalModule = portal_directives_2.PortalModule;
var dom_portal_host_1 = require("./portal/dom-portal-host");
exports.DomPortalHost = dom_portal_host_1.DomPortalHost;
var overlay_1 = require("./overlay/overlay");
exports.Overlay = overlay_1.Overlay;
exports.OVERLAY_PROVIDERS = overlay_1.OVERLAY_PROVIDERS;
var overlay_container_1 = require("./overlay/overlay-container");
exports.OverlayContainer = overlay_container_1.OverlayContainer;
var overlay_ref_1 = require("./overlay/overlay-ref");
exports.OverlayRef = overlay_ref_1.OverlayRef;
var overlay_state_1 = require("./overlay/overlay-state");
exports.OverlayState = overlay_state_1.OverlayState;
var overlay_directives_2 = require("./overlay/overlay-directives");
exports.ConnectedOverlayDirective = overlay_directives_2.ConnectedOverlayDirective;
exports.OverlayOrigin = overlay_directives_2.OverlayOrigin;
exports.OverlayModule = overlay_directives_2.OverlayModule;
__export(require("./overlay/position/connected-position-strategy"));
__export(require("./overlay/position/connected-position"));
var apply_transform_1 = require("./style/apply-transform");
exports.applyCssTransform = apply_transform_1.applyCssTransform;
var error_1 = require("./errors/error");
exports.MdError = error_1.MdError;
var field_value_1 = require("./annotations/field-value");
exports.BooleanFieldValue = field_value_1.BooleanFieldValue;
__export(require("./keyboard/keycodes"));
var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: []
        };
    };
    MdCoreModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [portal_directives_1.PortalModule, overlay_directives_1.OverlayModule],
                    exports: [portal_directives_1.PortalModule, overlay_directives_1.OverlayModule],
                },] },
    ];
    MdCoreModule.ctorParameters = function () { return []; };
    return MdCoreModule;
}());
exports.MdCoreModule = MdCoreModule;
//# sourceMappingURL=core.js.map