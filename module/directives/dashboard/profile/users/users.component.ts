import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { IUser, IDeveloper } from "../../../../models/interfaces";

import { AccountService } from "../../../../services/account.service";
import { UserService }    from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";

import * as Permissions   from "../../../../utils/Permissions";


@Component({
    selector   : "ui-users",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/profile/users/users.html",
})
export class UIUsers implements OnInit, OnDestroy {

    public isBusy = false;

    private _developer: IDeveloper;
    private _users: IUser[];

    constructor (
        @Inject(AccountService) private account: AccountService,
        @Inject(UserService)    private users: UserService,
        @Inject(MessageService) private messages: MessageService,
    ) {}


    public ngOnInit () {

        console.log("UIUsers Init");
        this.isBusy = true;

        this.account.Observable
            .first(d => !! d)
            .subscribe(d => this._developer = d);

        this.users.list()
            .then(users => {
                this.isBusy = false;
                this._users = users;
            })
            .catch(err => {
                console.error(err);
                this.isBusy = false;
                this.messages.error("Failed to Load User List", err.message, err);
            });
    }


    public ngOnDestroy () {
        console.log("UIUsers Destroy");
        this._users = undefined;
    }


    public get Users (): IUser[] {
        return this._users;
    }


    public isEditable (user: IUser) {

        if (this._developer.portalUser && this._developer.portalUser.id === user.id ) { return false; }
        return this._developer && Permissions.validate(this._developer.permissions, user.permissions);
    }


    public resendInvite (user: IUser) {

        this.users.sendInvite(user)
            .then(() => {
                this.messages.info("User Invite Resent", "Perhaps they'll get it this time.");
            })
            .catch(err => {
                this.messages.error("User Invite Failed to Send", "An unexpected error prevented the invite from being sent. Try again.", err);
            });
    }
}
