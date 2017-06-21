"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var account_service_1 = require("../../../services/account.service");
var message_service_1 = require("../../../services/message.service");
var application_service_1 = require("../../../services/application.service");
var EmailValidator_1 = require("../../../utils/EmailValidator");
var TeleportDevPortalSupportFormComponent = (function () {
    function TeleportDevPortalSupportFormComponent(http, account, apps, messages) {
        this.http = http;
        this.account = account;
        this.apps = apps;
        this.messages = messages;
        this.form = {
            account: "",
            app: "N/A",
            name: "",
            email: "",
            phone: "",
            topic: "bug_report",
            priority: "normal",
            description: "",
        };
        this.Applications = [];
        this.isSubmitted = false;
        this.isSuccess = false;
    }
    TeleportDevPortalSupportFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSubmitted = false;
        this.isSuccess = false;
        this.account.Observable
            .first(function (a) { return !!a; })
            .subscribe(function (a) {
            _this.form.account = a.id;
            _this.form.name = a.firstName + " " + a.lastName;
            _this.form.email = a.email;
            _this.form.phone = a.phone || "";
        });
        this.apps.Observable
            .first(function (a) { return !!a; })
            .subscribe(function (a) {
            _this.Applications = a;
        });
    };
    TeleportDevPortalSupportFormComponent.prototype.isEmailValid = function (email) {
        return EmailValidator_1.EmailValidator.isValid(email);
    };
    TeleportDevPortalSupportFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSubmitted = true;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        this.http
            .post(API_BASE_URL + "/support", JSON.stringify(this.form), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .toPromise()
            .then(function () {
            _this.isSuccess = true;
            _this.isSubmitted = false;
            _this.form = {
                account: "",
                app: "N/A",
                name: "",
                email: "",
                phone: "",
                topic: "bug_report",
                priority: "normal",
                description: "",
            };
            _this.messages.info("Support Request Delivered", "We will respond as soon as possible.");
        })
            .catch(function (err) {
            _this.isSuccess = false;
            _this.isSubmitted = false;
            _this.messages.error("Registration Failed", err.message, err);
        });
    };
    TeleportDevPortalSupportFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-support-form",
                    templateUrl: "support.html",
                },] },
    ];
    TeleportDevPortalSupportFormComponent.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
        { type: application_service_1.ApplicationService, decorators: [{ type: core_1.Inject, args: [application_service_1.ApplicationService,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
    ]; };
    return TeleportDevPortalSupportFormComponent;
}());
exports.TeleportDevPortalSupportFormComponent = TeleportDevPortalSupportFormComponent;
//# sourceMappingURL=support.component.js.map