"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Permissions_1 = require("../../../utils/Permissions");
var session_service_1 = require("../../../services/session.service");
var AllowAccessDirective = (function () {
    function AllowAccessDirective(el, renderer, session) {
        this.el = el;
        this.renderer = renderer;
        this.session = session;
        renderer.addClass(el.nativeElement, "block-access");
    }
    AllowAccessDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.session.Observable
            .first(function (s) { return !!s && !!s.developer; })
            .subscribe(function (s) {
            if (_this.allowAccess.split(" ").some(function (p) {
                return s !== null && Permissions_1.validate(s.developer.permissions, (_a = {}, _a[p] = true, _a));
                var _a;
            })) {
                _this.renderer.removeClass(_this.el.nativeElement, "block-access");
            }
        });
    };
    AllowAccessDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[allowAccess]",
                },] },
    ];
    AllowAccessDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: core_1.Renderer2, decorators: [{ type: core_1.Inject, args: [core_1.Renderer2,] },] },
        { type: session_service_1.SessionService, decorators: [{ type: core_1.Inject, args: [session_service_1.SessionService,] },] },
    ]; };
    AllowAccessDirective.propDecorators = {
        'allowAccess': [{ type: core_1.Input, args: ["allowAccess",] },],
    };
    return AllowAccessDirective;
}());
exports.AllowAccessDirective = AllowAccessDirective;
//# sourceMappingURL=access.directive.js.map