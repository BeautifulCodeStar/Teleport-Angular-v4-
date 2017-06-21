"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../vendor-js/google-recaptcha-api");
var core_1 = require("@angular/core");
var TeleportReCaptchaComponent = (function () {
    function TeleportReCaptchaComponent() {
        this.callback = new core_1.EventEmitter();
        this.expiredCallback = new core_1.EventEmitter();
    }
    TeleportReCaptchaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (window.location.search.indexOf("use-automated-testing-helpers") !== -1) {
            this.callback.emit("use-automated-testing-helpers");
        }
        else if (window.grecaptcha === undefined) {
            setTimeout(function () { return _this.ngAfterViewInit(); }, 200);
        }
        else {
            var id = "recaptcha-" + Math.random().toString(36).substr(2);
            this.renderDiv.nativeElement.id = id;
            var widgetId_1 = window.grecaptcha.render(id, {
                sitekey: this.sitekey,
                theme: this.theme || "light",
                callback: function (evt) { return _this.callback.emit(evt); },
                "expired-callback": function (evt) { return _this.expiredCallback.emit(evt); },
            });
            if (this.onReset) {
                this.subscription = this.onReset.subscribe(function () { return window.grecaptcha.reset(widgetId_1); });
            }
        }
    };
    TeleportReCaptchaComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TeleportReCaptchaComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "teleport-sp-recaptcha",
                    template: "<div #renderDiv class=\"g-recaptcha\"></div>",
                },] },
    ];
    TeleportReCaptchaComponent.ctorParameters = function () { return []; };
    TeleportReCaptchaComponent.propDecorators = {
        'renderDiv': [{ type: core_1.ViewChild, args: ["renderDiv",] },],
        'sitekey': [{ type: core_1.Input },],
        'theme': [{ type: core_1.Input },],
        'onReset': [{ type: core_1.Input },],
        'callback': [{ type: core_1.Output },],
        'expiredCallback': [{ type: core_1.Output },],
    };
    return TeleportReCaptchaComponent;
}());
exports.TeleportReCaptchaComponent = TeleportReCaptchaComponent;
//# sourceMappingURL=recaptcha.component.js.map