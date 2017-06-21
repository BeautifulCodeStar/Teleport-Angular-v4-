"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppCredentials_1 = require("./AppCredentials");
var Application = (function () {
    function Application(app) {
        this._id = app.id;
        this._createdAt = new Date(String(app.createdAt));
        this._lastModifiedAt = new Date(String(app.lastModifiedAt));
        this._name = app.name;
        this._friendlyName = app.friendlyName;
        this._status = app.status;
        this._isActive = app.isActive;
        this._notes = app.notes;
        this._credentials = (app.credentials || []).map(function (c) { return new AppCredentials_1.AppCredentials(c); });
        this._sipDomains = app.sipDomains;
    }
    Object.defineProperty(Application.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "createdAt", {
        get: function () { return new Date(this._createdAt.getTime()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "lastModifiedAt", {
        get: function () { return new Date(this._lastModifiedAt.getTime()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "friendlyName", {
        get: function () { return this._friendlyName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "isActive", {
        get: function () { return this._isActive; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "notes", {
        get: function () { return this._notes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "credentials", {
        get: function () { return this._credentials.slice(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "sipDomains", {
        get: function () { return Object.assign({}, this._sipDomains); },
        enumerable: true,
        configurable: true
    });
    Application.prototype.toJSON = function () {
        return {
            id: this.id,
            createdAt: this.createdAt.toISOString(),
            lastModifiedAt: this.lastModifiedAt.toISOString(),
            name: this.name,
            friendlyName: this.friendlyName,
            status: this.status,
            isActive: this.isActive,
            notes: this.notes,
            credentials: this._credentials.map(function (c) { return c.toJSON(); }),
            sipDomains: this.sipDomains,
        };
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map