import { Injectable, Inject } from "@angular/core";
import { Http }               from "@angular/http";

import { Observable }      from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observer }        from "rxjs/Observer";

import { ISession, IDeveloper } from "../models/interfaces";
import { Developer }            from "../models/Developer";

const API_BASE_URL = "http://localhost:8080";


/**
 * SessionService Class.
 */
@Injectable()
export class SessionService {

    private _observable: Observable<ISession | null>;
    private _observer: Observer<ISession | null>;

    private _session: ISession;

    private _isPingOnHold = false;
    private _lastRefresh = 0;

    constructor (@Inject(Http) private http: Http) {
        console.log("new SessionService()", http);
    }

    public cleanup () {
        delete this._session;
    }

    /**
     * Returns Observable<ISession> that broadcasts regular Session state.
     * @returns {Observable<ISession>}
     */
    public get Observable () {

        if (! this._observable) {

            this._observable = Observable
                .create((observer: Observer<ISession>) => this.createObservable(observer))
                .do((s: ISession) => {
                    this._session = s;
                    this._isPingOnHold = !s;
                })
                .multicast(new BehaviorSubject(this._session))
                .refCount();
        }

        this.refresh();
        return this._observable;
    }

    /**
     * This causes an immediate session ping that broadcasts to subscribers.
     */
    public refresh () {

        if (!!this._session && this._lastRefresh > Date.now() - 500) {
            // this._observer.next(this._session);
            return;
        }
        this._lastRefresh = Date.now();

        this._isPingOnHold = false;

        this.pingSession()
            .then(session => {
                if (this._observer) {
                    this._observer.next(session);
                }
            })
            .catch(err => {
                console.error("SessionService", err);
                if (this._observer) {
                    this._observer.next(null);
                }
            });
    }

    /**
     * Creates an Observable that pings for session every 10 minutes.
     * @returns {function(Observer<ISession>): function(): void}
     */
    private createObservable (observer: Observer<ISession>) {

        console.log("SessionService.createObservable", observer);

        this._observer = observer;

        this.refresh();

        const id = setInterval(() => {

                if (! this._isPingOnHold) {
                    this.refresh();
                }

            }, 1000 * 60 * 5);

        return () => {
            console.log("SessionService.createObservable complete", observer);
            delete this._observer;
            delete this._observable;
            delete this._session;
            clearInterval(id);
        };
    }

    /**
     * Makes a HTTP call to the Session service.
     * @returns {Promise<ISession>}
     */
    private pingSession (): Promise<ISession> {

        let url = [
            API_BASE_URL,
            "auth/developers",
        ].join("/");

        return this.http.get(url, { withCredentials: true })
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (res => res.json().developer as IDeveloper)
            .catch (() => Observable.throw(new Error("No Developer object was found.")))
            .map   (dev => ({
                loginAt  : this._session ? this._session.loginAt : new Date(),
                refreshAt: new Date(),
                developer: new Developer(dev),
            }))
            .toPromise();
    }
}
