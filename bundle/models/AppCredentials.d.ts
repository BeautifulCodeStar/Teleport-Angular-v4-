import { IAppCredentials } from "./interfaces";
export declare class AppCredentials implements IAppCredentials {
    private _products;
    private _apiKey;
    private _issuedAt;
    private _scopes;
    private _secretKey;
    private _status;
    constructor(cred: IAppCredentials);
    readonly products: string[];
    readonly apiKey: string;
    readonly issuedAt: Date;
    readonly scopes: string[];
    readonly secretKey: string;
    readonly status: "approved" | "revoked" | "pending";
    toJSON(): IAppCredentials;
}
