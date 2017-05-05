import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SessionService } from "./session.service";
import { IDeveloper } from "../models/interfaces";
import { Developer } from "../models/Developer";
export declare class AccountService {
    private http;
    private session;
    private _observable;
    private _observer;
    private _developer;
    private _lastRefresh;
    constructor(http: Http, session: SessionService);
    cleanup(): void;
    readonly Observable: Observable<IDeveloper>;
    refreshDeveloper(): Promise<IDeveloper>;
    update(dev: IDeveloper): Promise<Developer>;
    updatePassword(password: string, newPassword: string): Promise<boolean>;
    deleteAccount(id: string): Promise<boolean>;
}
