import { Http } from "@angular/http";
import { IUsageAggregateData } from "../models/interfaces";
import { AccountService } from "./account.service";
export interface IUsageRequest {
    beginDate: Date;
    endDate: Date;
    appId?: string;
}
export interface IUsageResponse {
    beginDate: Date;
    endDate: Date;
    usage: IUsageAggregateData[];
}
export declare class UsageService {
    private http;
    private account;
    private _developer;
    constructor(http: Http, account: AccountService);
    pullUsage(req: IUsageRequest): Promise<IUsageResponse>;
}
