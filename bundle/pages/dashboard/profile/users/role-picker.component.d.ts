import { OnInit, OnDestroy } from "@angular/core";
import { IUser, IDeveloper, IUserRole, IUserPermissionsTree, IUserPermissions } from "../../../../models/interfaces";
import { AccountService } from "../../../../services/account.service";
import { ModalService } from "../../../../services/modal.service";
export declare class TeleportDevPortalRolePickerComponent implements OnInit, OnDestroy {
    private account;
    user: IUser;
    isRolesSelectorOpen: boolean;
    role: IUserRole | undefined;
    Roles: IUserRole[];
    Template: IUserPermissions;
    Tree: {
        [key: string]: IUserPermissionsTree;
    };
    private _developer;
    constructor(account: AccountService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly Developer: IDeveloper;
    isRoleEvery(role: IUserRole): boolean;
    onRolesSelector(): void;
    onRolesClick(role: IUserRole): void;
}
export declare class TeleportDevPortalRolePickerRowComponent implements OnInit {
    private modal;
    dev: IDeveloper;
    user: IUser;
    tree: {
        [key: string]: IUserPermissionsTree;
    };
    readOnly: boolean;
    private _isCollapsed;
    private _nodes;
    constructor(modal: ModalService);
    ngOnInit(): void;
    readonly Nodes: string[];
    isCollapsed(node: string): boolean;
    hasChildren(node: string): boolean;
    toggleOpen(node: string): void;
    isPermAvailable(node: string, action: string): boolean;
    hasPerm(node: string, action: string): boolean;
    hasExactPerm(node: string, action: string): boolean;
    onPermClick(node: string, action: string): boolean;
}
