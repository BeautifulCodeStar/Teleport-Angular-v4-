"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../errors/error");
var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
    __extends(MdComponentPortalAttachedToDomWithoutOriginError, _super);
    function MdComponentPortalAttachedToDomWithoutOriginError() {
        return _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
            'because the DOM element is not part of the Angular application context.') || this;
    }
    return MdComponentPortalAttachedToDomWithoutOriginError;
}(error_1.MdError));
exports.MdComponentPortalAttachedToDomWithoutOriginError = MdComponentPortalAttachedToDomWithoutOriginError;
var MdNullPortalError = (function (_super) {
    __extends(MdNullPortalError, _super);
    function MdNullPortalError() {
        return _super.call(this, 'Must provide a portal to attach') || this;
    }
    return MdNullPortalError;
}(error_1.MdError));
exports.MdNullPortalError = MdNullPortalError;
var MdPortalAlreadyAttachedError = (function (_super) {
    __extends(MdPortalAlreadyAttachedError, _super);
    function MdPortalAlreadyAttachedError() {
        return _super.call(this, 'Host already has a portal attached') || this;
    }
    return MdPortalAlreadyAttachedError;
}(error_1.MdError));
exports.MdPortalAlreadyAttachedError = MdPortalAlreadyAttachedError;
var MdPortalHostAlreadyDisposedError = (function (_super) {
    __extends(MdPortalHostAlreadyDisposedError, _super);
    function MdPortalHostAlreadyDisposedError() {
        return _super.call(this, 'This PortalHost has already been disposed') || this;
    }
    return MdPortalHostAlreadyDisposedError;
}(error_1.MdError));
exports.MdPortalHostAlreadyDisposedError = MdPortalHostAlreadyDisposedError;
var MdUnknownPortalTypeError = (function (_super) {
    __extends(MdUnknownPortalTypeError, _super);
    function MdUnknownPortalTypeError() {
        return _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.') || this;
    }
    return MdUnknownPortalTypeError;
}(error_1.MdError));
exports.MdUnknownPortalTypeError = MdUnknownPortalTypeError;
var MdNullPortalHostError = (function (_super) {
    __extends(MdNullPortalHostError, _super);
    function MdNullPortalHostError() {
        return _super.call(this, 'Attempting to attach a portal to a null PortalHost') || this;
    }
    return MdNullPortalHostError;
}(error_1.MdError));
exports.MdNullPortalHostError = MdNullPortalHostError;
var MdNoPortalAttachedError = (function (_super) {
    __extends(MdNoPortalAttachedError, _super);
    function MdNoPortalAttachedError() {
        return _super.call(this, 'Attempting to detach a portal that is not attached to a host') || this;
    }
    return MdNoPortalAttachedError;
}(error_1.MdError));
exports.MdNoPortalAttachedError = MdNoPortalAttachedError;
//# sourceMappingURL=portal-errors.js.map