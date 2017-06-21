"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var message_service_1 = require("./message.service");
var account_service_1 = require("./account.service");
var BillingService = (function () {
    function BillingService(http, message, account) {
        var _this = this;
        this.http = http;
        this.message = message;
        this.account = account;
        this._paymentsFrom = Date.now() - 1000 * 60 * 60 * 24 * 7;
        this._paymentsTo = Date.now();
        this._lastRefresh = 0;
        this._billingPayload = {};
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) { return _this._developer = d; });
    }
    BillingService.prototype.cleanup = function () {
        this._billingPayload = {};
    };
    Object.defineProperty(BillingService.prototype, "Observable", {
        get: function () {
            var _this = this;
            if (!this._observable) {
                this._observable = Observable_1.Observable
                    .create(function (observer) { return _this._observer = observer; })
                    .do(function (payload) { return _this._billingPayload = {
                    balance: payload.balance === undefined ? payload.balance : _this._billingPayload.balance,
                    payments: payload.payments || _this._billingPayload.payments,
                    dateRange: payload.dateRange || _this._billingPayload.dateRange,
                }; })
                    .multicast(new BehaviorSubject_1.BehaviorSubject(this._billingPayload))
                    .refCount();
            }
            this.refresh().catch(function (err) { return _this._observer.error(err); });
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    BillingService.prototype.refresh = function () {
        var _this = this;
        if (this._lastRefresh > Date.now() - 500) {
            return Promise.resolve(this._billingPayload);
        }
        this._lastRefresh = Date.now();
        return new Promise(function (resolve, reject) {
            Promise.all([
                _this.refreshBalance(),
                _this.refreshPayments(),
            ])
                .then(function (results) {
                resolve({
                    balance: results[0],
                    payments: results[1],
                    dateRange: {
                        from: new Date(_this._paymentsFrom),
                        to: new Date(_this._paymentsTo),
                    },
                });
            })
                .catch(function (err) { return reject(err); });
        });
    };
    BillingService.prototype.refreshPayments = function (from, to) {
        var _this = this;
        if (from === void 0) { from = this._paymentsFrom; }
        if (to === void 0) { to = this._paymentsTo; }
        this._paymentsTo = to;
        this._paymentsFrom = from;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments",
        ].join("/");
        return this.http.get(url, { search: "begin_date=" + new Date(from).toISOString() + "&end_date=" + new Date(to).toISOString(), withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().payments; })
            .map(function (payments) { return payments.map(function (p) { return Object.assign({}, p, { submitted_on: new Date(String(p.submitted_on)) }); }); })
            .do(function (payments) { return payments.sort(function (a, b) { return b.submitted_on - a.submitted_on; }); })
            .do(function (payments) { return _this._observer.next({
            payments: payments,
            dateRange: {
                from: new Date(_this._paymentsFrom),
                to: new Date(_this._paymentsTo),
            },
        }); })
            .catch(function (err) { return _this.message.error("Payments Load Failure", err.message, err); })
            .toPromise();
    };
    BillingService.prototype.refreshBalance = function () {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/balance",
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().balance; })
            .do(function (balance) { return _this._observer.next({ balance: balance }); })
            .catch(function (err) { return _this.message.error("Account Balance Load Failure", err.message, err); })
            .toPromise();
    };
    BillingService.prototype.getBraintreeClientToken = function () {
        var _this = this;
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/braintree-client-token",
        ].join("/");
        return this.http.get(url, { withCredentials: true })
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().user_message)); })
            .map(function (resp) { return resp.json().clientToken; })
            .catch(function (err) { return _this.message.error("Payment Setup Failure", err.message, err); })
            .toPromise();
    };
    BillingService.prototype.makePayment = function (amount, nonce, method, card_type, last_four) {
        var payment_method = { nonce: nonce, method: method, card_type: card_type, last_four: last_four };
        var url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments",
        ].join("/");
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, JSON.stringify({ amount: amount, payment_method: payment_method }), options)
            .catch(function (err) { return Observable_1.Observable.throw(new Error(err.json().help)); })
            .map(function (resp) { return resp.json().transaction; })
            .toPromise();
    };
    BillingService.decorators = [
        { type: core_1.Injectable },
    ];
    BillingService.ctorParameters = function () { return [
        { type: http_1.Http, decorators: [{ type: core_1.Inject, args: [http_1.Http,] },] },
        { type: message_service_1.MessageService, decorators: [{ type: core_1.Inject, args: [message_service_1.MessageService,] },] },
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    return BillingService;
}());
exports.BillingService = BillingService;
//# sourceMappingURL=billing.service.js.map