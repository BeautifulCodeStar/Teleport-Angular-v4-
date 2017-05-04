
import { Injectable, Inject } from "@angular/core";
import { Http }               from "@angular/http";

import { Observable }      from "rxjs/Observable";

import { IUsageDataResponse, IUsageAggregateData, IDeveloper } from "../models/interfaces";
import { AccountService }                              from "./account.service";


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


@Injectable()
export class UsageService {

    private _developer: IDeveloper = null;


    constructor(
        @Inject(Http)           private http: Http,
        @Inject(AccountService) private account: AccountService,
    ) {
        account.Observable
            .first(d => !! d)
            .subscribe (d => this._developer = d);
    }

    /**
     * Refresh with the current filters.
     * @returns {Promise<ILogsResponse>}
     */
    public pullUsage (req: IUsageRequest): Promise<IUsageResponse> {

        // const resp = {
        //     beginDate : req.beginDate, // new Date(mockData.begin_date),
        //     endDate   : req.endDate, // new Date(mockData.end_date),
        //     usage     : mockData.usage,
        // };

        // return new Promise <IUsageResponse> (resolve => setTimeout(() => resolve(resp), 2000));

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "data",
            "usage",
        ].join("/");

        const search = new URLSearchParams();
        search.set("begin_date", req.beginDate.toISOString());
        search.set("end_date", req.endDate.toISOString());
        if (req.appId) { search.set("app_id", req.appId); }

        return this.http.get(url, { search: search.toString(), withCredentials: true })
            .catch(err  => Observable.throw(new Error(err.json().user_message)))
            .map  (resp => resp.json().data)
            .map  ((data: any) => ({
                beginDate : new Date(data.begin_date),
                endDate   : new Date(data.end_date),
                usage     : data.usage,
            }))
            .toPromise();
    }
}


// const mockData: IUsageDataResponse<IUsageAggregateData> = {
//     "begin_date": "2017-04-01T07:00:00.000Z",
//     "end_date": "2017-04-12T21:20:13.353Z",
//     "usage": [
//         {
//             "service_id": "prog_sms",
//             "service_label": "Programmable SMS",
//             "quantity": 19,
//             "price_total": 0.125,
//             "locations": [
//                 {
//                     "country_code": "US",
//                     "country_label": "United States",
//                     "quantity": 19,
//                     "price_total": 0.125,
//                     "items": [
//                         {
//                             "type": "SMS_INB",
//                             "label": "Inbound Messages",
//                             "quantity": 13,
//                             "price_total": 0.065,
//                         },
//                         {
//                             "type": "SMS_OUTB",
//                             "label": "Outbound Messages",
//                             "quantity": 6,
//                             "price_total": 0.06,
//                         },
//                     ],
//                 },
//             ],
//         },
//         {
//             "service_id": "prog_voice",
//             "service_label": "Programmable Voice",
//             "quantity": 425.9,
//             "price_total": 6.0465,
//             "locations": [
//                 {
//                     "country_code": "US",
//                     "country_label": "United States",
//                     "quantity": 425.9,
//                     "price_total": 6.0465,
//                     "items": [
//                         {
//                             "type": "MIN_INBL",
//                             "label": "Inbound Minutes",
//                             "quantity": 45.2,
//                             "price_total": 0.339,
//                         },
//                         {
//                             "type": "MIN_OTBL",
//                             "label": "Outbound Minutes",
//                             "quantity": 378.8,
//                             "price_total": 5.682,
//                         },
//                         {
//                             "type": "MIN_OTBT",
//                             "label": "Toll-Free Outbound Minutes",
//                             "quantity": 1.7,
//                             "price_total": 0.0255,
//                         },
//                         {
//                             "type": "MIN_INBT",
//                             "label": "Toll-Free Inbound Minutes",
//                             "quantity": 0.2,
//                             "price_total": 0,
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
// };
