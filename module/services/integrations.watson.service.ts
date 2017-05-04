
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";

import { IWatson, IDeveloper} from "../models/interfaces";
import { AccountService }  from "./account.service";


export interface IWatsonPutRequest {
    textToSpeech: {
        username: string;
        password: string;
    };
}


@Injectable()
export class IntegrationsWatsonService {

    private _developer: IDeveloper = null;

    constructor(
        @Inject(Http)           private http: Http,
        @Inject(AccountService) private account: AccountService,
    ) {
        console.log("new IntegrationsWatsonService()", arguments);

        account.Observable.first(d => !!d).subscribe(d => this._developer = d);
    }


    public getTextToSpeech (appId: string): Promise<IWatson> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");

        return this.http
            .get(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise();
    }


    public putTextToSpeech (appId: string, watson: IWatsonPutRequest): Promise<IWatson> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");

        return this.http
            .put(url, JSON.stringify(watson), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise();
    }


    public deleteTextToSpeech (appId: string): Promise<IWatson> {

        const url = [
            API_BASE_URL, "developers", encodeURIComponent(this._developer.id),
            "apps", encodeURIComponent(appId), "integrations/watson",
        ].join("/");

        return this.http
            .delete(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map(r => r.json().settings)
            .toPromise();
    }
}
