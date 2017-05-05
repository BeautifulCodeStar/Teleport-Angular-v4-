import { Http } from "@angular/http";
import { IAWS } from "../models/interfaces";
import { AccountService } from "./account.service";
export interface IAWSPutRequest {
    accessKey: string;
    securityKey: string;
    s3: {
        region?: string;
        bucket: string;
    };
}
export declare class IntegrationsAWSService {
    private http;
    private account;
    private _developer;
    constructor(http: Http, account: AccountService);
    getAWS(appId: string): Promise<IAWS>;
    putAWS(appId: string, aws: IAWSPutRequest): Promise<IAWS>;
    deleteAWS(appId: string): Promise<IAWS>;
}
