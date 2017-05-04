import { Injectable, Inject } from "@angular/core";
import { Http, Headers }      from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { IDeveloper, ITopUp } from "../models/interfaces";

import { AccountService } from "./account.service";


@Injectable()
export class TopUpService {

    private _developer: IDeveloper;
    private _topUp: ITopUp;

    private _observable: Observable<ITopUp>;
    private _observer: Observer<ITopUp>;

    constructor(
        @Inject(Http)           private http: Http,
        @Inject(AccountService) private account: AccountService,
    ) {
        account.Observable
            .first(d => !! d)
            .subscribe (d => this._developer = d);
    }


    public get Observable (): Observable<ITopUp> {

        if (! this._observable) {

            this._observable = Observable
                .create((observer: Observer<ITopUp>) => this._observer = observer)
                .do((topUp: ITopUp) => this._topUp = topUp)
                .multicast(new BehaviorSubject(this._topUp))
                .refCount();

            this.refresh();
        }

        return this._observable;
    }


    public refresh () {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");

        this.http.get(url, { withCredentials: true })
            .catch     (err  => Observable.throw(new Error(err.json().user_message)))
            .map       (resp => resp.json().topUp as ITopUp)
            .subscribe (
                resp => this._observer.next(resp),
                err  => this._observer.error(err),
            );
    }


    public updateTopUp (data: ITopUp) {

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/top-up",
        ].join("/");

        const headers = new Headers({ "Content-Type": "application/json" });

        this.http.post(url, JSON.stringify(data), { headers: headers, withCredentials: true })
            .catch     (err  => Observable.throw(new Error(err.json().user_message)))
            .map       (resp => resp.json().topUp as ITopUp)
            .subscribe (
            resp => this._observer.next(resp),
            err  => this._observer.error(err),
        );

    }
}
