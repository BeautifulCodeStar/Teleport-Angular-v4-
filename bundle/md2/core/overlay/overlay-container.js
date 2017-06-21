"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OverlayContainer = (function () {
    function OverlayContainer() {
    }
    OverlayContainer.prototype.getContainerElement = function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    OverlayContainer.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('md-overlay-container');
        document.body.appendChild(container);
        this._containerElement = container;
    };
    return OverlayContainer;
}());
exports.OverlayContainer = OverlayContainer;
//# sourceMappingURL=overlay-container.js.map