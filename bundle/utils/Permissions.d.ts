import { IUserPermissions, IUserPermissionsTree, IUserRole } from "../models/interfaces";
export declare const Template: IUserPermissions;
export declare const Roles: ReadonlyArray<IUserRole>;
export declare const Tree: IUserPermissionsTree;
export declare function copyTree(): IUserPermissionsTree;
export declare function validate(grantor: IUserPermissions, target: IUserPermissions): boolean;
