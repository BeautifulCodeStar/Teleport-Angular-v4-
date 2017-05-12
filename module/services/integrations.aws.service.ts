
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";

import { IAWS, IDeveloper } from "../models/interfaces";
import { AccountService }   from "./account.service";

declare const API_BASE_URL: string;


export interface IAWSPutRequest {
    accessKey: string;
    securityKey: string;
    s3: {
        region?: string;
        bucket: string;
    };
}


@Injectable()
export class IntegrationsAWSService {

    private _developer: IDeveloper;

    constructor(
        @Inject(Http)           private http: Http,
        @Inject(AccountService) private account: AccountService,
    ) {

        this.account.Observable.first(d => !!d).subscribe(d => this._developer = d);
    }


    public getAWS (appId: string): Promise<IAWS> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");

        return this.http
            .get(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise();
    }


    public putAWS (appId: string, aws: IAWSPutRequest): Promise<IAWS> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");

        return this.http
            .put(url, JSON.stringify(aws), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise();
    }


    public deleteAWS (appId: string): Promise<IAWS> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/aws",
        ].join("/");

        return this.http
            .delete(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise();
    }
}
