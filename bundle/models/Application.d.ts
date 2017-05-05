import { IApplication, IAppCredentials, ISipDomains } from "./interfaces";
export declare class Application implements IApplication {
    private _id;
    private _createdAt;
    private _lastModifiedAt;
    private _name;
    private _friendlyName;
    private _status;
    private _isActive;
    private _notes;
    private _credentials;
    private _sipDomains;
    constructor(app: IApplication);
    readonly id: string;
    readonly createdAt: Date;
    readonly lastModifiedAt: Date;
    readonly name: string;
    readonly friendlyName: string;
    readonly status: "approved" | "revoked";
    readonly isActive: boolean;
    readonly notes: string;
    readonly credentials: IAppCredentials[];
    readonly sipDomains: ISipDomains;
    toJSON(): IApplication;
}
