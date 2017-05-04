
import {IAppCredentials} from "./interfaces";

/**
 * Application Credentials class is immutable.
 */
export class AppCredentials implements IAppCredentials {
    
    private _products: string[];
    private _apiKey: string;
    private _issuedAt: Date;
    private _scopes: string[];
    private _secretKey: string;
    private _status: "approved" | "revoked" | "pending";

    constructor (cred: IAppCredentials) {
        
        this._products = cred.products.slice(0);
        this._apiKey = cred.apiKey;
        this._issuedAt = new Date(String(cred.issuedAt));
        this._scopes = cred.scopes.slice(0);
        this._secretKey = cred.secretKey;
        this._status = cred.status;
    }

    
    public get products () { return this._products.slice(0); };
    
    public get apiKey () { return this._apiKey; };
    
    public get issuedAt () { return new Date(this._issuedAt.getTime()); };
    
    public get scopes () { return this._scopes.slice(0); };
    
    public get secretKey () { return this._secretKey; };
    
    public get status () { return this._status; };

    public toJSON (): IAppCredentials {
        
        return {
            products: this.products,
            apiKey: this.apiKey,
            issuedAt: this.issuedAt,
            scopes: this.scopes,
            secretKey: this.secretKey,
            status: this.status,
        };
    }
}
