"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyCssTransform(element, transformValue) {
    var value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}
exports.applyCssTransform = applyCssTransform;
//# sourceMappingURL=apply-transform.js.map