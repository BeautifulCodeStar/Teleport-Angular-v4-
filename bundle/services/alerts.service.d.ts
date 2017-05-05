import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IAlert } from "../models/interfaces";
import { AccountService } from "./account.service";
export declare class AlertsService {
    private http;
    private account;
    private _developer;
    private _observable;
    private _observer;
    private _alerts;
    private _lastRefresh;
    constructor(http: Http, account: AccountService);
    cleanup(): void;
    readonly Observable: Observable<IAlert[]>;
    refresh(): Promise<IAlert[]>;
    add(alert: IAlert): Promise<boolean>;
    remove(alert: IAlert): Promise<boolean>;
}
