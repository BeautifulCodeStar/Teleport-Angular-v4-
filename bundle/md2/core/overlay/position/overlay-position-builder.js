"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewport_ruler_1 = require("./viewport-ruler");
var connected_position_strategy_1 = require("./connected-position-strategy");
var core_1 = require("@angular/core");
var global_position_strategy_1 = require("./global-position-strategy");
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    OverlayPositionBuilder.prototype.global = function () {
        return new global_position_strategy_1.GlobalPositionStrategy();
    };
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new connected_position_strategy_1.ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder.decorators = [
        { type: core_1.Injectable },
    ];
    OverlayPositionBuilder.ctorParameters = function () { return [
        { type: viewport_ruler_1.ViewportRuler, },
    ]; };
    return OverlayPositionBuilder;
}());
exports.OverlayPositionBuilder = OverlayPositionBuilder;
//# sourceMappingURL=overlay-position-builder.js.map