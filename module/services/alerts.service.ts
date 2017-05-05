
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { IAlert, IDeveloper } from "../models/interfaces";
import { Alert }              from "../models/Alert";

import { AccountService } from "./account.service";

const API_BASE_URL = "http://localhost:8080";


@Injectable()
export class AlertsService {

    private _developer: IDeveloper;

    private _observable: Observable<IAlert[]>;
    private _observer: Observer<IAlert[]>;

    private _alerts: IAlert[];

    private _lastRefresh = 0;

    constructor(
        @Inject(Http) private http: Http,
        @Inject(AccountService) private account: AccountService,
    ) {
        console.log("new AlertsService()", arguments);

        this.account.Observable
            .first(d => !! d)
            .subscribe (d => this._developer = d);

        this._observable = Observable
            .create((observer: Observer<IAlert[]>) => this._observer = observer)
            .do((a: IAlert[]) => this._alerts = a)
            .multicast(new BehaviorSubject(this._alerts))
            .refCount();
    }


    public cleanup () {
        this._alerts = [];
    }


    public get Observable (): Observable<IAlert[]> {
        this.refresh().catch(err => this._observer.error(err));
        return this._observable;
    }


    public refresh (): Promise<IAlert[]> {

        if (this._lastRefresh > Date.now() - 5000) { return Promise.resolve(this._alerts); }
        this._lastRefresh = Date.now();

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "alerts",
        ].join("/");

        return this.http
            .get(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (res => res.json().alerts.map((a: IAlert) => new Alert(a)))
            .do   ((a: IAlert[])   => {
                if (this._observer) {
                    this._observer.next(a);
                } else {
                    this._alerts = a;
                }
            })
            .toPromise();
    }
    

    public add (alert: IAlert): Promise<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "alerts",
        ].join("/");

        return this.http
            .post(url, JSON.stringify(alert), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (()  => true)
            .do   (()  => this.refresh())
            .toPromise();
    }


    public remove (alert: IAlert): Promise<boolean> {

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "alerts",
            alert.id,
        ].join("/");

        return this.http
            .delete(url, { withCredentials: true })
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (()  => true)
            .do   (()  => this.refresh())
            .toPromise();
    }
}
