import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router }               from "@angular/router";

import { IUser, IDeveloper } from "../../../../models/interfaces";

import { AccountService } from "../../../../services/account.service";
import { UserService }    from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
import { Modal }          from "../../../../services/modal.service";

import { EmailValidator } from "../../../../utils/EmailValidator";
import * as Permissions   from "../../../../utils/Permissions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-user-update",
    templateUrl: "user.update.html",
    styleUrls  : [ "../../../css/bootswatch.min.css", "../../../css/main.min.css" ],
})
export class TeleportDevPortalUserUpdateComponent implements OnInit, OnDestroy {

    public isBusy = false;
    public isEditing = false;

    private _developer: IDeveloper;
    private _origUser: IUser;
    private _user: IUser;

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(AccountService) private account: AccountService,
        @Inject(UserService)    private users: UserService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Modal.Service)  private modal: Modal.Service,
    ) {}


    public ngOnInit () {

        this.isBusy = true;
        const userId = parseInt((this.route.snapshot.params as any).userId, 10);

        console.log("UIUserUpdate Init", userId);

        this.account.Observable
            .first(d => !! d)
            .subscribe (dev => {

                this._developer = dev;

                if (this._developer.portalUser && this._developer.portalUser.id === userId ) {
                    this.messages.warning("That way madness lies!", "You cannot edit your own user here.");
                    return this.router.navigateByUrl("/dashboard/account/users");
                }

                if (["account.users.delete", "account.users.update"].some(p => Permissions.validate(dev.permissions, { [p]: true }))) {

                    this.users.detail(userId)
                        .then(user => {

                            if (! Permissions.validate(dev.permissions, user.permissions)) {
                                this.messages.warning("Your Permission Kung-Fu is Weak", "You do not have all the permissions required to edit this user.");
                                this.router.navigateByUrl("/dashboard/account/users");
                                return;
                            }

                            this._origUser = user;
                            this._user = Object.assign({}, this._origUser);
                            this._user.permissions = Object.assign({}, this._origUser.permissions);
                            this.isBusy = false;
                        })
                        .catch(err => {
                            this.messages.error("Failed to Load User", err.message, err);
                            return this.router.navigateByUrl("/dashboard/account/users");
                        });

                } else {
                    return this.router.navigate(["/dashboard/access-denied"], { queryParams: { perms: "account.users.update account.users.delete" }});
                }
            });
    }


    public ngOnDestroy () {
        delete this._user;
    }


    public get User () {
        return this._user;
    }


    public editUser () {
        this.isEditing = !! this._user;
    }


    public deleteUser () {

        this.modal.show("Delete Application", `<p>Clicking OK will delete the user "${this.User.firstName} ${this.User.lastName}".</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(isOk => {
                if (isOk) {
                    this.isBusy = true;
                    this.users.remove(this._user)
                        .then(() => {
                            this.messages.warning("User Deleted", `Alas, poor ${this._user.firstName}! I knew him, ${this._developer.firstName}.`);
                            return this.router.navigate(["/dashboard/account/users"]);
                        })
                        .catch(err => {
                            this.isBusy = false;
                            this.messages.error("User Delete Failed", `The following error occurred: ${err.message}.`, err);
                        });
                }
            });
    }


    public isEmailValid () {
        return EmailValidator.isValid(this.User.email);
    }


    public isUserValid () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    }


    public saveChanges () {

        if (! this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }

        this.isEditing = false;
        this.isBusy = true;

        this.users.update(this._user)
            .then(user => {
                this._origUser = user;
                this._user = Object.assign({}, this._origUser);
                this._user.permissions = Object.assign({}, this._origUser.permissions);
                this.isBusy = false;
                this.messages.info("User Updated", "This user has been successfully updated.");
            })
            .catch(err => {
                this.isBusy = false;
                this.messages.error("User Update Failed", `The following error occurred: ${err.message}.`, err);
            });
    }


    public cancelChanges () {
        this.isEditing = false;
        this._user = Object.assign({}, this._origUser);
        this._user.permissions = Object.assign({}, this._origUser.permissions);
    }

}
