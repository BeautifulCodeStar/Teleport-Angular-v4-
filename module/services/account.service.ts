import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { SessionService }       from "./session.service";
import { IDeveloper, ISession } from "../models/interfaces";
import { Developer }            from "../models/Developer";


@Injectable()
export class AccountService {

    private _observable: Observable<IDeveloper>;
    private _observer: Observer<IDeveloper>;

    private _developer: IDeveloper = null;

    private _lastRefresh = 0;

    constructor (
        @Inject(Http)           private http: Http,
        @Inject(SessionService) private session: SessionService
    ) {
        console.log("new AccountService()", http, session);

        this.session.Observable
            .first(s => !!s)
            .subscribe((s: ISession) => {
                this._developer = new Developer(s.developer);
                if (this._observer) {
                    this._observer.next(this._developer);
                }
            });
    }

    public cleanup () {
        console.log("AccountService cleanup");
        if (this._observer) { this._observer.complete(); }
        this._developer = null;
    }

    /**
     * Emits an updated Developer instance, or null.
     * @returns {Observable<Developer>}
     */
    public get Observable (): Observable<IDeveloper> {
        
        if (! this._observable) {
            this._observable = Observable
                .create((observer: Observer<IDeveloper>) => this._observer = observer)
                .do((dev: IDeveloper) => this._developer = dev)
                .multicast(new BehaviorSubject(this._developer))
                .refCount();
        }
        
        this.refreshDeveloper();
        return this._observable;
    }

    /**
     * Reload the developer from DB.
     * @return {Promise<IDeveloper>
     */
    public refreshDeveloper (): Promise<IDeveloper> {

        if (! this._developer) { return; }

        if (this._lastRefresh > Date.now() - 500) { return; }
        this._lastRefresh = Date.now();
        
        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
        ].join("/");

        return this.http.get(url, { withCredentials: true })
            .catch(err  => Observable.throw(new Error(err.json().user_message)))
            .map  (resp => new Developer(resp.json().developer))
            .do   ((dev: IDeveloper)  => { if (this._observer) { this._observer.next(dev); }})
            .toPromise();
    }

    /**
     * Update a Developer's Account.
     * @param {IDeveloper} dev
     * @returns {Promise<Developer>}
     */
    public update (dev: IDeveloper): Promise<Developer> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
        ].join("/");

        return this.http.put(url, JSON.stringify(dev), options)
                .catch(err => Observable.throw(new Error(err.json().user_message)))
                .map  (res => new Developer(res.json().developer))
                .do((d: IDeveloper) => {
                    if (this._observer) { this._observer.next(d); }
                    this.session.refresh();
                })
                .catch(err => Observable.throw(err))
                .toPromise();
    }

    /**
     * Updates the password for the Developer's account.
     * @param password
     * @param newPassword
     * @returns {Promise<boolean>}
     */
    public updatePassword (password: string, newPassword: string): Promise<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "passwords",
            encodeURIComponent(password),
        ].join("/");

        return this.http.put(url, JSON.stringify({password, newPassword}), options)
                .catch(err => Observable.throw(new Error(err.json().user_message)))
                .do(() => this.session.refresh())
                .catch(err => Observable.throw(err))
                .map(() => true)
                .toPromise();
    }

    /**
     * Logout and then delete the developer account.
     * @param id
     * @returns {Promise<boolean>}
     */
    public deleteAccount (id: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            let url = [
                API_BASE_URL,
                "developers",
                encodeURIComponent(id),
            ].join("/");

            this.http.delete(url, { withCredentials: true })
                .catch(err => Observable.throw(new Error(err.json().user_message)))
                .do(() => this.session.refresh())
                .subscribe(() => resolve(true), err => reject(err));

        });
    }
}
