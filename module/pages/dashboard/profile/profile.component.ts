import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router }                               from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { AccountService } from "../../../services/account.service";
import { MessageService } from "../../../services/message.service";
import { Modal }          from "../../../services/modal.service";
import { IDeveloper }     from "../../../models/interfaces";
import { Developer }      from "../../../models/Developer";

import { EmailValidator } from "../../../utils/EmailValidator";

@Component({
    selector   : "ui-profile",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/profile/profile.html",
})
export class UIProfile implements OnInit, OnDestroy {

    public Developer: IDeveloper;

    public isBusy = false;
    public isEditProfile = false;
    public isChangePassword = false;

    private _developer: IDeveloper;
    private _subscription: Subscription;

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(AccountService) private account: AccountService,
        @Inject(Modal.Service)  private modal: Modal.Service,
        @Inject(MessageService) private messages: MessageService,
    ) {}

    public ngOnInit () {
        console.log("UIProfile Init");
        this._subscription = this.account.Observable
            .filter(d => !! d)
            .subscribe(dev => {

                if (dev.portalUser) {
                    this.router.navigateByUrl("/dashboard/account/user");
                    return;
                }

                this._developer = new Developer(dev).toJSON();
                if (! this.isEditProfile) {
                    this.Developer = Object.assign({}, this._developer);
                    console.log(this.Developer);
                }
            });
    }
    
    public ngOnDestroy () {
        console.log("UIProfile Destroy");
        if (this._subscription) { this._subscription.unsubscribe(); }
        this.Developer = undefined;
        this._developer = undefined;
    }


    public onStartEditMode () {
        this.isEditProfile = true;
        this.Developer = Object.assign({}, this._developer);
    }

    public closePasswordForm () {
        this.isChangePassword = false;
    }

    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }

    public onSubmit () {

        this.isBusy = true;

        this.account.update(this.Developer)
            .then(() => {
                this.messages.info("Account Updated", "The changes to your account were successfully saved.");
                this.isBusy = false;
                this.isEditProfile = false;
            })
            .catch(err => {
                this.messages.error("Account Update Failure", err.message, err);
                this.isBusy = false;
            });
    }

    public onDelete () {

        this.modal.show("Delete My Account", `<p>Clicking OK will delete your account. All applications under this account will stop working. All phone numbers will be released.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.account.deleteAccount(this._developer.id)
                        .then(() => {
                            this.messages.warning("Account Deleted", "Your account has been deleted.");
                            this.router.navigateByUrl("/logout");
                        })
                        .catch(err => {
                            this.isBusy = false;
                            this.messages.error("Delete Account Failure", err.message, err);
                        });
                }
            });
    }

    public onCancel () {
        this.isBusy = false;
        this.isEditProfile = false;
        this.Developer = Object.assign({}, this._developer);
    }
}
