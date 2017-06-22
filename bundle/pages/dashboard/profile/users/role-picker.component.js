"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_service_1 = require("../../../../services/account.service");
var modal_service_1 = require("../../../../services/modal.service");
var Permissions = require("../../../../utils/Permissions");
var TeleportDevPortalRolePickerComponent = (function () {
    function TeleportDevPortalRolePickerComponent(account) {
        this.account = account;
        this.isRolesSelectorOpen = false;
        this.Roles = [];
        this.Template = Permissions.Template;
        this.Tree = Permissions.Tree.subTree;
    }
    TeleportDevPortalRolePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.account.Observable
            .first(function (d) { return !!d; })
            .subscribe(function (d) {
            _this._developer = d;
            _this.Roles = Permissions.Roles.filter(function (r) {
                return Permissions.validate(_this._developer.permissions, r.permissions.reduce(function (p, c) { return (p[c] = true) && p; }, {}));
            });
            _this.role = Permissions.Roles.find(function (r) { return _this.isRoleEvery(r); });
        });
    };
    TeleportDevPortalRolePickerComponent.prototype.ngOnDestroy = function () {
        delete this._developer;
        delete this.user;
    };
    Object.defineProperty(TeleportDevPortalRolePickerComponent.prototype, "Developer", {
        get: function () {
            return this._developer;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalRolePickerComponent.prototype.isRoleEvery = function (role) {
        var _this = this;
        return role.permissions.length === Object.keys(this.user.permissions).length && role.permissions.every(function (p) { return !!_this.user.permissions[p]; });
    };
    TeleportDevPortalRolePickerComponent.prototype.onRolesSelector = function () {
        this.isRolesSelectorOpen = true;
    };
    TeleportDevPortalRolePickerComponent.prototype.onRolesClick = function (role) {
        var _this = this;
        if (role) {
            Object.keys(this.user.permissions).forEach(function (p) { return delete _this.user.permissions[p]; });
            role.permissions.forEach(function (p) { return _this.user.permissions[p] = true; });
        }
        this.isRolesSelectorOpen = false;
        this.role = role;
    };
    TeleportDevPortalRolePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-role-picker",
                    templateUrl: "role-picker.html",
                },] },
    ];
    TeleportDevPortalRolePickerComponent.ctorParameters = function () { return [
        { type: account_service_1.AccountService, decorators: [{ type: core_1.Inject, args: [account_service_1.AccountService,] },] },
    ]; };
    TeleportDevPortalRolePickerComponent.propDecorators = {
        'user': [{ type: core_1.Input, args: ["user",] },],
    };
    return TeleportDevPortalRolePickerComponent;
}());
exports.TeleportDevPortalRolePickerComponent = TeleportDevPortalRolePickerComponent;
var TeleportDevPortalRolePickerRowComponent = (function () {
    function TeleportDevPortalRolePickerRowComponent(modal) {
        this.modal = modal;
        this._nodes = [];
    }
    TeleportDevPortalRolePickerRowComponent.prototype.ngOnInit = function () {
        this._nodes = Object.keys(this.tree);
        this._isCollapsed = this._nodes.reduce(function (p, c) { return (p[c] = true) && p; }, {});
    };
    Object.defineProperty(TeleportDevPortalRolePickerRowComponent.prototype, "Nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalRolePickerRowComponent.prototype.isCollapsed = function (node) {
        return this._isCollapsed[node];
    };
    TeleportDevPortalRolePickerRowComponent.prototype.hasChildren = function (node) {
        return Object.keys(this.tree[node].subTree).length > 0;
    };
    TeleportDevPortalRolePickerRowComponent.prototype.toggleOpen = function (node) {
        this._isCollapsed[node] = !this._isCollapsed[node];
    };
    TeleportDevPortalRolePickerRowComponent.prototype.isPermAvailable = function (node, action) {
        return this.tree[node].actions.some(function (a) { return a.endsWith(action); });
    };
    TeleportDevPortalRolePickerRowComponent.prototype.hasPerm = function (node, action) {
        if (!this.user || !this.tree) {
            return false;
        }
        var perm = this.tree[node].actions.find(function (a) { return a.endsWith(action); });
        if (!perm) {
            return false;
        }
        return Permissions.validate(this.user.permissions, (_a = {}, _a[perm] = true, _a));
        var _a;
    };
    TeleportDevPortalRolePickerRowComponent.prototype.hasExactPerm = function (node, action) {
        return this.user.permissions[this.tree[node].actions.find(function (a) { return a.endsWith(action); }) || ""];
    };
    TeleportDevPortalRolePickerRowComponent.prototype.onPermClick = function (node, action) {
        if (this.readOnly) {
            this.modal.show("Permissions Locked", "<p>If you would like to set custom permissions for this user, change the <strong>User Role</strong> to <strong>\"Custom Permissions...\"</strong>.</p>", { type: "alert" }).catch(function (err) { return console.error(err); });
            return;
        }
        if (!this.dev || !this.user || !this.tree) {
            return false;
        }
        var perm = this.tree[node].actions.find(function (a) { return a.endsWith(action); });
        if (!perm) {
            return;
        }
        if (!Permissions.validate(this.dev.permissions, (_a = {}, _a[perm] = true, _a))) {
            return;
        }
        if (this.hasExactPerm(node, action)) {
            delete this.user.permissions[perm];
        }
        else {
            this.user.permissions[perm] = true;
        }
        var _a;
    };
    TeleportDevPortalRolePickerRowComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-role-picker-row",
                    template: "\n        <ul>\n            <li *ngFor=\"let node of Nodes\" [ngClass]=\"{ collapsed: isCollapsed(node) }\">\n                <a *ngIf=\"hasChildren(node)\" (click)=\"toggleOpen(node)\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a>\n                <b *ngIf=\"! hasChildren(node)\"><span class=\"glyphicon glyphicon-option-horizontal\"></span></b>\n                {{ node[0].toUpperCase() + node.slice(1) }}\n                <span>\n                    <span *ngFor=\"let a of ['create','read','update','delete']\" class=\"glyphicon\"\n                        (click)=\"onPermClick(node, a)\"\n                        [ngClass]=\"{ 'glyphicon-unchecked': ! hasPerm(node, a) && isPermAvailable(node, a), 'glyphicon-ok-sign': hasPerm(node, a), 'glyphicon-minus disabled': ! isPermAvailable(node, a), exact: hasExactPerm(node, a) }\"\n                    ></span>\n                </span>\n                <teleport-dev-portal-role-picker-row [dev]=\"dev\" [user]=\"user\" [tree]=\"tree[node].subTree\" [readOnly]=\"readOnly\"></teleport-dev-portal-role-picker-row>\n            </li>\n        </ul>\n    ",
                },] },
    ];
    TeleportDevPortalRolePickerRowComponent.ctorParameters = function () { return [
        { type: modal_service_1.ModalService, decorators: [{ type: core_1.Inject, args: [modal_service_1.ModalService,] },] },
    ]; };
    TeleportDevPortalRolePickerRowComponent.propDecorators = {
        'dev': [{ type: core_1.Input, args: ["dev",] },],
        'user': [{ type: core_1.Input, args: ["user",] },],
        'tree': [{ type: core_1.Input, args: ["tree",] },],
        'readOnly': [{ type: core_1.Input, args: ["readOnly",] },],
    };
    return TeleportDevPortalRolePickerRowComponent;
}());
exports.TeleportDevPortalRolePickerRowComponent = TeleportDevPortalRolePickerRowComponent;
//# sourceMappingURL=role-picker.component.js.map