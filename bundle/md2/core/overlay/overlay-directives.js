"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var overlay_1 = require("./overlay");
var portal_1 = require("../portal/portal");
var overlay_state_1 = require("./overlay-state");
var connected_position_1 = require("./position/connected-position");
var portal_directives_1 = require("../portal/portal-directives");
var defaultPositionList = [
    new connected_position_1.ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new connected_position_1.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
var OverlayOrigin = (function () {
    function OverlayOrigin(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
        get: function () {
            return this._elementRef;
        },
        enumerable: true,
        configurable: true
    });
    OverlayOrigin.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[overlay-origin]',
                    exportAs: 'overlayOrigin',
                },] },
    ];
    OverlayOrigin.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return OverlayOrigin;
}());
exports.OverlayOrigin = OverlayOrigin;
var ConnectedOverlayDirective = (function () {
    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
        this._overlay = _overlay;
        this._templatePortal = new portal_1.TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    ConnectedOverlayDirective.prototype.ngOnInit = function () {
        this._createOverlay();
    };
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        var overlayConfig = new overlay_state_1.OverlayState();
        overlayConfig.positionStrategy =
            this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
        this._overlayRef = this._overlay.create(overlayConfig);
        this._overlayRef.attach(this._templatePortal);
    };
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        this._overlayRef.dispose();
    };
    ConnectedOverlayDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[connected-overlay]'
                },] },
    ];
    ConnectedOverlayDirective.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
    ]; };
    ConnectedOverlayDirective.propDecorators = {
        'origin': [{ type: core_1.Input },],
        'positions': [{ type: core_1.Input },],
    };
    return ConnectedOverlayDirective;
}());
exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
var OverlayModule = (function () {
    function OverlayModule() {
    }
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: overlay_1.OVERLAY_PROVIDERS,
        };
    };
    OverlayModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [portal_directives_1.PortalModule],
                    exports: [ConnectedOverlayDirective, OverlayOrigin],
                    declarations: [ConnectedOverlayDirective, OverlayOrigin],
                },] },
    ];
    OverlayModule.ctorParameters = function () { return []; };
    return OverlayModule;
}());
exports.OverlayModule = OverlayModule;
//# sourceMappingURL=overlay-directives.js.map