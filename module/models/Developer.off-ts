
import { IDeveloper, IUserPermissions, IUser } from "./interfaces";

/**
 * Developer class is immutable.
 */
export class Developer implements IDeveloper {
    
    private _id: string;
    private _status: string;
    private _createdAt: Date;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _company: string | undefined;
    private _phone: string | undefined;
    private _numApps: number;
    private _maxApps: number;
    private _maxSubAccountsPerApp: number;
    private _permissions: IUserPermissions;
    private _portalUser: IUser | undefined;

    constructor (dev: IDeveloper) {

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
    
    public get id () { return this._id; }

    public get status () { return this._status; }

    public get createdAt () { return new Date(this._createdAt.getTime()); }

    public get firstName () { return this._firstName; }

    public get lastName () { return this._lastName; }

    public get email () { return this._email; }

    public get company () { return this._company; }

    public get phone () { return this._phone; }

    public get numApps () { return this._numApps; }

    public get maxApps () { return this._maxApps; }

    public get maxSubAccountsPerApp () { return this._maxSubAccountsPerApp; }

    public get permissions () { return Object.assign({}, this._permissions); }

    public get portalUser () { return this._portalUser; }

    public toJSON (): IDeveloper {
        
        return {
            id       : this.id,
            status   : this.status,
            createdAt: this.createdAt.toISOString(),
            firstName: this.firstName,
            lastName : this.lastName,
            email    : this.email,
            company  : this.company,
            phone    : this.phone,
            numApps  : this.numApps,
            maxApps  : this.maxApps,
            maxSubAccountsPerApp: this.maxSubAccountsPerApp,
            permissions : this.permissions,
            portalUser  : this.portalUser,
        };
    }
}
