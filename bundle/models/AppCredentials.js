"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppCredentials = (function () {
    function AppCredentials(cred) {
        this._products = cred.products.slice(0);
        this._apiKey = cred.apiKey;
        this._issuedAt = new Date(String(cred.issuedAt));
        this._scopes = cred.scopes.slice(0);
        this._secretKey = cred.secretKey;
        this._status = cred.status;
    }
    Object.defineProperty(AppCredentials.prototype, "products", {
        get: function () { return this._products.slice(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCredentials.prototype, "apiKey", {
        get: function () { return this._apiKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCredentials.prototype, "issuedAt", {
        get: function () { return new Date(this._issuedAt.getTime()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCredentials.prototype, "scopes", {
        get: function () { return this._scopes.slice(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCredentials.prototype, "secretKey", {
        get: function () { return this._secretKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCredentials.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    AppCredentials.prototype.toJSON = function () {
        return {
            products: this.products,
            apiKey: this.apiKey,
            issuedAt: this.issuedAt,
            scopes: this.scopes,
            secretKey: this.secretKey,
            status: this.status,
        };
    };
    return AppCredentials;
}());
exports.AppCredentials = AppCredentials;
//# sourceMappingURL=AppCredentials.js.map