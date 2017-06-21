"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Developer = (function () {
    function Developer(dev) {
        this._id = dev.id;
        this._status = dev.status;
        this._createdAt = new Date(String(dev.createdAt));
        this._firstName = dev.firstName;
        this._lastName = dev.lastName;
        this._email = dev.email;
        this._company = dev.company || undefined;
        this._phone = dev.phone || undefined;
        this._numApps = dev.numApps;
        this._maxApps = dev.maxApps;
        this._maxSubAccountsPerApp = dev.maxSubAccountsPerApp;
        this._permissions = Object.assign({}, dev.permissions);
        this._portalUser = dev.portalUser;
    }
    Object.defineProperty(Developer.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "createdAt", {
        get: function () { return new Date(this._createdAt.getTime()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "firstName", {
        get: function () { return this._firstName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "lastName", {
        get: function () { return this._lastName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "email", {
        get: function () { return this._email; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "company", {
        get: function () { return this._company; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "phone", {
        get: function () { return this._phone; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "numApps", {
        get: function () { return this._numApps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "maxApps", {
        get: function () { return this._maxApps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "maxSubAccountsPerApp", {
        get: function () { return this._maxSubAccountsPerApp; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "permissions", {
        get: function () { return Object.assign({}, this._permissions); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Developer.prototype, "portalUser", {
        get: function () { return this._portalUser; },
        enumerable: true,
        configurable: true
    });
    Developer.prototype.toJSON = function () {
        return {
            id: this.id,
            status: this.status,
            createdAt: this.createdAt.toISOString(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            company: this.company,
            phone: this.phone,
            numApps: this.numApps,
            maxApps: this.maxApps,
            maxSubAccountsPerApp: this.maxSubAccountsPerApp,
            permissions: this.permissions,
            portalUser: this.portalUser,
        };
    };
    return Developer;
}());
exports.Developer = Developer;
//# sourceMappingURL=Developer.js.map