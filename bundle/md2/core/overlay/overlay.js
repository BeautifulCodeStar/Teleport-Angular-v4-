"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var overlay_state_1 = require("./overlay-state");
var dom_portal_host_1 = require("../portal/dom-portal-host");
var overlay_ref_1 = require("./overlay-ref");
var overlay_position_builder_1 = require("./position/overlay-position-builder");
var viewport_ruler_1 = require("./position/viewport-ruler");
var overlay_container_1 = require("./overlay-container");
var nextUniqueId = 0;
var defaultState = new overlay_state_1.OverlayState();
var Overlay = (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
    }
    Overlay.prototype.create = function (state) {
        if (state === void 0) { state = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state);
    };
    Overlay.prototype.position = function () {
        return this._positionBuilder;
    };
    Overlay.prototype._createPaneElement = function () {
        var pane = document.createElement('div');
        pane.id = "md-overlay-" + nextUniqueId++;
        pane.classList.add('md-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    Overlay.prototype._createPortalHost = function (pane) {
        return new dom_portal_host_1.DomPortalHost(pane, this._componentFactoryResolver);
    };
    Overlay.prototype._createOverlayRef = function (pane, state) {
        return new overlay_ref_1.OverlayRef(this._createPortalHost(pane), pane, state);
    };
    Overlay.decorators = [
        { type: core_1.Injectable },
    ];
    Overlay.ctorParameters = function () { return [
        { type: overlay_container_1.OverlayContainer, },
        { type: core_1.ComponentFactoryResolver, },
        { type: overlay_position_builder_1.OverlayPositionBuilder, },
    ]; };
    return Overlay;
}());
exports.Overlay = Overlay;
exports.OVERLAY_PROVIDERS = [
    viewport_ruler_1.ViewportRuler,
    overlay_position_builder_1.OverlayPositionBuilder,
    Overlay,
    overlay_container_1.OverlayContainer,
];
//# sourceMappingURL=overlay.js.map