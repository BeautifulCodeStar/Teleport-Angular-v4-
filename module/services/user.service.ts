import { Injectable, Inject } from "@angular/core";
import { Http, Headers }      from "@angular/http";

import { Observable }      from "rxjs/Observable";

import { IDeveloper, IUser } from "../models/interfaces";
import { AccountService }    from "./account.service";

declare const API_BASE_URL: string;


// interface IUserDetailResponse {
//     developer: IDeveloper;
//     portalUser: IUser;
// }
//
// interface IUserListResponse {
//     developer: IDeveloper;
//     portalUsers: IUser[];
// }


/**
 * UserService Class.
 */
@Injectable()
export class UserService {

    private _developer: IDeveloper;

    constructor(
        @Inject(Http)           private http: Http,
        @Inject(AccountService) private account: AccountService,
    ) {
        this.account.Observable
            .first(d => !! d)
            .subscribe (d => this._developer = d);
    }

    /**
     * Returns a list of Portal Users.
     * @returns {Promise<IUser[]>}
     */
    public list (): Promise<IUser[]> {

        let options = { withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");

        return this.http
            .get  (url, options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (r => r.json().portalUsers)
            .toPromise();
    }

    /**
     * Returns the details of a Portal User.
     * @param {number} userId - the ID of the Portal User to retrieve.
     * @returns {Promise<IUser>}
     */
    public detail (userId: number): Promise<IUser> {

        let options = { withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            userId,
        ].join("/");

        return this.http
            .get  (url, options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (r => r.json().portalUser)
            .toPromise();
    }

    /**
     * Creates a new Portal User
     * @param {IUser} user - the data to create the Portal User.
     * @returns {Promise<IUser>}
     */
    public create (user: IUser): Promise<IUser> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
        ].join("/");

        return this.http
            .post (url, JSON.stringify(user), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (r => r.json().portalUser)
            .toPromise();
    }

    /**
     * Updates the given Portal User.
     * @param {IUser} user - the Portal User to update.
     * @returns {Promise<IUser>}
     */
    public update (user: IUser): Promise<IUser> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");

        return this.http
            .put  (url, JSON.stringify(user), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (r => r.json().portalUser)
            .toPromise();
    }

    /**
     * Updates the given Portal User password.
     * @param {IUser} user - the Portal User to update.
     * @param {string} oldPassword - the user's current password.
     * @param {string} password - the new password.
     * @returns {Promise<IUser>}
     */
    public updatePassword (user: IUser, oldPassword: string, password: string): Promise<IUser> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "password",
        ].join("/");

        return this.http
            .put  (url, JSON.stringify({ oldPassword, password }), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (r => r.json().portalUser)
            .toPromise();
    }

    /**
     * Deletes a Portal User.
     * @param {IUser} user - the Portal User to delete.
     * @returns {Promise<boolean>}
     */
    public remove (user: IUser): Promise<boolean> {

        let options = { withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
        ].join("/");

        return this.http
            .delete(url, options)
            .catch (err => Observable.throw(new Error(err.json().user_message)))
            .map   (() => true)
            .toPromise();
    }

    /**
     * Send an email to the given user.
     * @param {IUser} user
     * @returns {Promise<boolean>}
     */
    public sendInvite (user: IUser): Promise<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = { headers, withCredentials: true };

        const url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "portal-users",
            user.id,
            "send-invite",
        ].join("/");

        return this.http
            .post (url, JSON.stringify(user), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .map  (() => true)
            .toPromise();
    }
}
