"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var Observable_1 = require("rxjs/Observable");
var MessageService = (function () {
    function MessageService(doc) {
        this.doc = doc;
        var div = doc.getElementById("message-container-ber2z79jspqlg14i");
        if (div !== null) {
            this.containerDiv = div;
        }
        else {
            this.containerDiv = doc.createElement("div");
            this.containerDiv.id = "message-container-ber2z79jspqlg14i";
            this.containerDiv.className = "messages-container";
            doc.body.appendChild(this.containerDiv);
        }
    }
    MessageService.prototype.info = function (title, message) {
        console.log("Info Message", title, message);
        this.initAlert(title, message, "success");
    };
    MessageService.prototype.warning = function (title, message, err) {
        console.log("Warning Message", title, message, err);
        this.initAlert(title, message, "warning");
        return Observable_1.Observable.throw(err || new Error(message));
    };
    MessageService.prototype.error = function (title, message, err) {
        console.error("Error Message", title, message, err);
        this.initAlert(title, message, "danger");
        return Observable_1.Observable.throw(err || new Error(message));
    };
    MessageService.prototype.initAlert = function (title, message, type) {
        var _this = this;
        var button = this.doc.createElement("button");
        button.type = "button";
        button.className = "close";
        button.innerHTML = "&times;";
        var h = this.doc.createElement("h5");
        h.innerText = title;
        var p = this.doc.createElement("p");
        p.innerText = message;
        var alert = this.doc.createElement("div");
        alert.className = "alert alert-dismissible alert-" + type + " animate";
        alert.appendChild(button);
        alert.appendChild(h);
        alert.appendChild(p);
        var autoRemoveId = setTimeout(function () {
            if (alert.parentElement) {
                alert.style.webkitAnimation = "fadeOutRight 2s";
                alert.style.animation = "fadeOutRight 2s";
                alert.style.opacity = "0";
                setTimeout(function () { if (alert.parentElement) {
                    _this.containerDiv.removeChild(alert);
                } }, 2100);
            }
        }, 5000);
        alert.addEventListener("click", function () {
            if (alert.parentElement) {
                clearInterval(autoRemoveId);
                alert.style.webkitAnimation = "fadeOutRight 500ms";
                alert.style.animation = "fadeOutRight 500ms";
                alert.style.opacity = "0";
                setTimeout(function () { if (alert.parentElement) {
                    _this.containerDiv.removeChild(alert);
                } }, 600);
            }
        });
        this.containerDiv.appendChild(alert);
    };
    MessageService.decorators = [
        { type: core_1.Injectable },
    ];
    MessageService.ctorParameters = function () { return [
        { type: HTMLDocument, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
    ]; };
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map