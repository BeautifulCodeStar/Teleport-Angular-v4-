import { Injectable, Inject } from "@angular/core";
import { Http, Headers }      from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription }    from "rxjs/Subscription";

import { IApplication, IAppCredentials, IDeveloper } from "../models/interfaces";

import { Application }    from "../models/Application";
import { Developer }      from "../models/Developer";
import { AccountService } from "./account.service";
import { MessageService } from "./message.service";


@Injectable()
export class ApplicationService {

    private _observable: Observable<IApplication[]>;
    private _observer: Observer<IApplication[]>;
    private _subscription: Subscription;

    private _developer: IDeveloper;
    private _applications: IApplication[] = null;
    private _lastRefresh = 0;

    constructor (
        @Inject(Http)           private http: Http,
        @Inject(AccountService) private account: AccountService,
        @Inject(MessageService) private message: MessageService,
    ) {
        console.log("new ApplicationService()", arguments);

        this._subscription = this.account.Observable
            .filter(d => !! d)
            .subscribe((d: IDeveloper) => {
                this._developer = new Developer(d);
                this.refreshApps();
            });
    }

    public cleanup () {
        console.log("ApplicationService cleanup");
        if (this._observer) { this._observer.complete(); }
        if (this._subscription) { this._subscription.unsubscribe(); }
        this._developer = undefined;
        this._applications = null;
        this._lastRefresh = 0;
    }

    /**
     * Returns an Observable that emits the latest Applications list.
     * @returns {Observable<IApplication[]>}
     */
    public get Observable (): Observable<IApplication[]> {

        if (! this._observable) {

            this._observable = Observable
                .create((observer: Observer<IApplication[]>) => this._observer = observer)
                .map((apps: IApplication[]) => {
                    apps.sort((a, b) => +(a.friendlyName > b.friendlyName) || +(a.friendlyName === b.friendlyName) - 1);
                    return apps;
                })
                .do((apps: IApplication[]) => this._applications = apps)
                .multicast(new BehaviorSubject(this._applications))
                .refCount();
        }

        this.refreshApps();
        return this._observable;
    }

    /**
     * Refreshes the Application list.
     */
    public refreshApps () {

        if (! this._developer) { return; }

        if (this._lastRefresh > Date.now() - 500) { return; }
        this._lastRefresh = Date.now();

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
        ].join("/");

        this.http.get(url, { withCredentials: true })
            .catch (err  => Observable.throw(new Error(err.json().user_message)))
            .map   (resp => resp.json().apps.map((app: IApplication) => new Application(app)))
            .subscribe(
                apps => {
                    if (this._observer) { this._observer.next(apps); }
                },
                err  => this.message.error("Application List Refresh Failure", err.message, err),
            );
    }

    /**
     * Fetch an app by its name (not ID and not friendlyName).
     * @param {string} appName - the name the Apigee API likes.
     * @returns {Promise<IApplication>}
     */
    public getAppByName (appName: string): Promise<IApplication> {

        let app: IApplication = this._applications && this._applications.find(a => a.name === appName);
        if (app) {
            return Promise.resolve(new Application(app));
        }

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(appName),
        ].join("/");

        return this.http.get(url, { withCredentials: true })
            .catch (err  => Observable.throw(new Error(err.json().user_message)))
            .map   (resp => new Application(resp.json().app))
            .catch (err  => this.message.error("Application Failed to Load" , "Perhaps no application exists by that name.", err))
            .toPromise();
    }

    /**
     * Creates a new application in Apigee and TelApp. Refreshes the list.
     * @param {string} appName - the app's friendly name.
     * @param {string} notes - notes about the app.
     * @param {string} reCaptchaResponse
     * @returns {Promise<IApplication>
     */
    public createApp (appName: string, notes = "", reCaptchaResponse = ""): Promise<IApplication> {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
        ].join("/");

        let headers = new Headers({ "Content-Type": "application/json" });

        return this.http.post(url, JSON.stringify({appName, notes, "g-recaptcha-response": reCaptchaResponse}), { headers, withCredentials: true })
            .catch (err  => {
                this.message.error("New Application Failure", err.json().user_message, new Error(`Bad response status: ${err.status}`));
                return Observable.throw(new Error(err.json().user_message));
            })
            .map   (resp => new Application(resp.json()))
            .do    ((app: IApplication)  => this.message.info("New Application Created", `The application "${app.friendlyName}" has been created.`))
            .do    (()   => this.refreshApps())
            .catch (err  => this.message.error("Application Glitch" , "It looks like the application was created but the web app glitched. Try refreshing this view to see the new application.", err))
            .toPromise();
    }

    /**
     * Updates an application. Refreshes the list.
     * @param {IApplication} app - the application to update
     * @param {string} appName - the new app name
     * @param {[string]} notes - the new app notes
     * @returns {Promise<IApplication>
     */
    public updateApp (app: IApplication, appName: string, notes = app.notes): Promise<IApplication> {

        if (app.name === appName && app.notes === notes) {
            this.message.warning("Application Update Failure", "No changes were found for the application.");
            return;
        }

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
        ].join("/");

        let headers = new Headers({ "Content-Type": "application/json" });

        return this.http.put(url, JSON.stringify({appName, notes}), { headers, withCredentials: true })
            .catch (err  => this.message.error("Application Update Failure", err.json().user_message, new Error(`Bad response status: ${err.status}`)))
            .map   (resp => new Application(resp.json()))
            .do    (()   => this.message.info("Application Updated", `The application "${app.friendlyName}" has been updated.`))
            .do    (()   => this.refreshApps())
            .toPromise();
    }

    /**
     * Deletes the specified application. Refreshes the list.
     * @param {IApplication} app - the application to delete
     * @return {Promise<boolean>}
     */
    public deleteApp (app: IApplication): Promise<boolean> {
        
        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
        ].join("/");
        
        return this.http.delete(url, { withCredentials: true })
            .catch (err => this.message.error("Application Delete Failure", err.json().user_message, new Error(`Bad response status: ${err.status}`)))
            .do    (()  => this.message.info("Application Deleted", `The application "${app.friendlyName}" has been removed.`))
            .map   (()  => true)
            .do    (()  => this.refreshApps())
            .toPromise();
    }

    /**
     * Create new credentials for the specified application.
     * @param {IApplication} app
     * @returns {Promise<IApplication>}
     */
    public createAppCredentials (app: IApplication): Promise<IApplication> {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
            "credentials",
        ].join("/");

        let headers = new Headers({ "Content-Type": "application/json" });

        return this.http.post(url, "", { headers: headers, withCredentials: true })
            .catch (err  => this.message.error("Credentials Create Failure", err.json().user_message, new Error(`Bad response status: ${err.status}`)))
            .map   (resp => new Application(resp.json().app))
            .do    (()   => this.message.info("Credentials Created", `New application credentials were created.`))
            .do    (()   => this.refreshApps())
            .toPromise();
    }

    /**
     * Delete the specified credentials.
     * @param {IApplication} app
     * @param {IAppCredentials} creds
     * @returns {Promise<boolean>}
     */
    public deleteAppCredentials (app: IApplication, creds: IAppCredentials): Promise<boolean> {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "apps",
            encodeURIComponent(app.name),
            "credentials",
            encodeURIComponent(creds.apiKey),
        ].join("/");

        return this.http.delete(url, { withCredentials: true })
            .catch (err => this.message.error("Credentials Delete Failure", err.json().user_message, new Error(`Bad response status: ${err.status}`)))
            .map   (()  => true)
            .do    (()  => this.message.info("Credentials Deleted", `The application credentials were deleted.`))
            .do    (()  => this.refreshApps())
            .toPromise();
    }
}
