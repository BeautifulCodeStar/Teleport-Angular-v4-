import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ILog } from "../models/interfaces";
import { AccountService } from "./account.service";
export interface ILogsRequest {
    beginDate?: Date | string;
    endDate?: Date | string;
    appId?: string;
    direction?: "inbound" | "outbound" | "both";
    connectTime?: number;
}
export interface ILogsResponse {
    isTruncated: boolean;
    updatedOn: Date;
    beginDate: Date;
    endDate: Date;
    logs: ILog[];
}
export declare class LogsService {
    private http;
    private account;
    private _developer;
    private _observable;
    private _observer;
    private _logs;
    private _searchParams;
    private _lastRefresh;
    constructor(http: Http, account: AccountService);
    destroy(): void;
    readonly Observable: Observable<ILogsResponse>;
    refresh(): Promise<ILogsResponse>;
    loadLogs(logs: ILogsRequest): Promise<ILogsResponse>;
}
