import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { Developer }         from "../models/Developer";
import { IDeveloper, IUser } from "../models/interfaces";
import { SessionService }    from "./session.service";


export interface ILoginResponse {
    developer?: IDeveloper;
    possibleLogins?: (IDeveloper & IUser & { authCode: string })[];
}


@Injectable()
export class LoginService {

    constructor (
        @Inject(Http) private http: Http,
        @Inject(SessionService) private session: SessionService,
    ) {}

    /**
     * Register a new Developer in Apigee and TelApp.
     * @param {*} dev
     * @returns {Promise<boolean>}
     */
    public register (dev: any): Promise<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        return this.http.post(`${API_BASE_URL}/register`, JSON.stringify(dev), options)
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (res => true)
            .catch (err => Observable.throw(err))
            .toPromise();
    }

    /**
     * Login to a Developer's account.
     * @param {string} userName
     * @param {string} password
     * @param {string} reCaptchaResponse
     * @returns {Promise<ILoginResponse>}
     */
    public login (userName: string, password: string, reCaptchaResponse: string): Promise<ILoginResponse> {

        let url = [
            API_BASE_URL,
            "auth/developers",
            encodeURIComponent(userName),
            encodeURIComponent(password),
        ].join("/");

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        return this.http.post(url, JSON.stringify({"g-recaptcha-response": reCaptchaResponse}), options)
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map(res => res.json() as ILoginResponse)
            .map(res => ({
                developer: res.developer ? new Developer(res.developer) : null,
                possibleLogins: res.possibleLogins ? res.possibleLogins : null,
            }))
            .do    ((res: ILoginResponse) => res.developer && this.session.refresh())
            .catch (err => Observable.throw(err))
            .toPromise();
    }


    public loginAs (userName: string, password: string, id: string|number, authCode: string): Promise<IDeveloper> {

        let url = [
            API_BASE_URL,
            "auth/developers",
            encodeURIComponent(userName),
            encodeURIComponent(password),
            id,
        ].join("/");

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        return this.http.post(url, JSON.stringify({ authCode }), options)
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (res => new Developer(res.json().developer as IDeveloper))
            .do    (() => this.session.refresh())
            .catch (err => Observable.throw(err))
            .toPromise();
    }

    /**
     * Logout of Developer's account.
     * @returns {Promise<boolean>}
     */
    public logout (): Promise<boolean> {

        let url = [
            API_BASE_URL,
            "auth/developers",
        ].join("/");

        return this.http.delete(url, { withCredentials: true })
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (() => false)
            .do    (() => this.session.refresh())
            .catch (err => Observable.throw(err))
            .toPromise();
    }

    /**
     * Sends an email with reset password instructions.
     * @param email
     * @param reCaptchaResponse
     * @returns {Promise<boolean>}
     */
    public recoverPassword (email: string, reCaptchaResponse: string): Promise<boolean> {

        let url = [
            API_BASE_URL,
            "auth/developers/recover",
            encodeURIComponent(email),
        ].join("/");

        let body = {
            "g-recaptcha-response": reCaptchaResponse,
        };

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        return this.http.post(url, JSON.stringify(body), options)
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (() => true)
            .toPromise();
    }

    /**
     * Reset the Developer's password with the given password.
     * @param email
     * @param password
     * @param authKey
     * @param reCaptchaResponse
     * @returns {Promise<boolean>}
     */
    public resetPassword (email: string, password: string, authKey: string, reCaptchaResponse: string): Promise<boolean> {

        let url = [
            API_BASE_URL,
            "auth/developers/reset",
            encodeURIComponent(email),
        ].join("/");

        let body = {
            "g-recaptcha-response": reCaptchaResponse,
            password,
            authKey,
        };

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        return this.http.post(url, JSON.stringify(body), options)
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (() => true)
            .toPromise();
    }
}
