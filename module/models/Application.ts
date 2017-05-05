
import { IApplication, IAppCredentials, ISipDomains } from "./interfaces";
import { AppCredentials }                             from "./AppCredentials";

/**
 * Developer's Application class is immutable.
 */
export class Application implements IApplication {
    
    private _id: string;
    private _createdAt: Date;
    private _lastModifiedAt: Date;
    private _name: string;
    private _friendlyName: string;
    private _status: "approved" | "revoked";         // approved, revoked
    private _isActive: boolean;
    private _notes: string;
    private _credentials: AppCredentials[];
    private _sipDomains: ISipDomains;


    constructor (app: IApplication) {
        
        this._id = app.id;
        this._createdAt = new Date(String(app.createdAt));
        this._lastModifiedAt = new Date(String(app.lastModifiedAt));
        this._name = app.name;
        this._friendlyName = app.friendlyName;
        this._status = app.status;
        this._isActive = app.isActive;
        this._notes = app.notes;
        this._credentials = (app.credentials || []).map(c => new AppCredentials(c));
        this._sipDomains = app.sipDomains;
    }

    get id() { return this._id; }

    get createdAt() { return new Date(this._createdAt.getTime()); }

    get lastModifiedAt() { return new Date(this._lastModifiedAt.getTime()); }

    get name() { return this._name; }

    get friendlyName() { return this._friendlyName; }
    
    get status() { return this._status; }

    get isActive() { return this._isActive; }

    get notes() { return this._notes; }

    get credentials(): IAppCredentials[] { return this._credentials.slice(0); }

    get sipDomains (): ISipDomains { return Object.assign({}, this._sipDomains); }

    public toJSON (): IApplication {
        
        return {
            id             : this.id,
            createdAt      : this.createdAt.toISOString(),
            lastModifiedAt : this.lastModifiedAt.toISOString(),
            name           : this.name,
            friendlyName   : this.friendlyName,
            status         : this.status,
            isActive       : this.isActive,
            notes          : this.notes,
            credentials    : this._credentials.map(c => c.toJSON()),
            sipDomains     : this.sipDomains,
        };
    }
}
