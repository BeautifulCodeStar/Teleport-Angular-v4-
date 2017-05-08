import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { ISession } from "../models/interfaces";
export declare class SessionService {
    private http;
    private _observable;
    private _observer;
    private _session;
    private _isPingOnHold;
    private _lastRefresh;
    constructor(http: Http);
    cleanup(): void;
    readonly Observable: Observable<ISession>;
    refresh(): void;
    private createObservable(observer);
    private pingSession();
}
