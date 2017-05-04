import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router }                               from "@angular/router";

import {IUser, IDeveloper} from "../../../../models/interfaces";

import { AccountService } from "../../../../services/account.service";
import { UserService }    from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";

import { EmailValidator } from "../../../../utils/EmailValidator";
import * as Permissions   from "../../../../utils/Permissions";


@Component({
    selector   : "ui-user-create",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/profile/users/user.create.html",
})
export class UIUserCreate implements OnInit, OnDestroy {

    public isBusy = false;
    public isSendInvite = true;

    private _developer: IDeveloper;
    private User: IUser;

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(AccountService) private account: AccountService,
        @Inject(UserService)    private users: UserService,
        @Inject(MessageService) private messages: MessageService,
    ) {}


    public ngOnInit () {

        this.account.Observable
            .first(d => !! d)
            .subscribe (dev => {

                this._developer = dev;

                if (Permissions.validate(dev.permissions, { "account.users.create": true })) {

                    this.User = {
                        id: 0,
                        developerId: "",
                        createdOn: new Date(),
                        status: "unverified",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
                        permissions: Object.assign({}, dev.permissions),
                        phoneNo: "",
                        position: "",
                        notes: "",
                    };

                    this.isBusy = false;

                } else {
                    this.router.navigate(["/dashboard/access-denied"], { queryParams: { perms: "account.users.create" }});
                }
            });
    }


    public ngOnDestroy () {

        console.log("UIUserCreate Destroy");
        this._developer = undefined;
        this.User = undefined;
    }


    public isEmailValid () {
        return EmailValidator.isValid(this.User.email);
    }


    public isUserValid () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    }


    public onSubmit () {

        if (! this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }

        this.isBusy = true;
        this.users.create(this.User)
            .then(user => {
                this.messages.info("User Created", "The new user was successfully created.");
                if (this.isSendInvite) {
                    this.users.sendInvite(user);
                    this.messages.info("Email Invite Sent", "An email invitation has been sent to the user.");
                }
                this.router.navigateByUrl("/dashboard/account/users");
            })
            .catch(err => {
                this.isBusy = false;
                this.messages.error(
                    "New User Failure",
                    "An unexpected error prevented the user from being created. Try again or contact support.",
                    err
                );
            });
    }
}
