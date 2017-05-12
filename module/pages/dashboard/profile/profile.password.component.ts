import { Component, Inject, Output, EventEmitter, Input } from "@angular/core";

import { IUser }          from "../../../models/interfaces";
import { AccountService } from "../../../services/account.service";
import { UserService }    from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import PasswordUtil       from "../../../utils/PasswordUtil";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-profile-password",
    templateUrl: "profile.password.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalProfilePasswordComponent {

    public isBusy = false;
    public password = "";
    public newPassword = "";
    public newPasswordVerify = "";
    @Output() private onComplete = new EventEmitter<void>();

    constructor(
        @Inject(AccountService) private account: AccountService,
        @Inject(MessageService) private messages: MessageService,
    ) {}


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }

    public passwordsMatch () {
        return this.newPassword === this.newPasswordVerify;
    }

    public onSubmit () {

        if (! this.newPassword || ! this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }

        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }

        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }

        if (! PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }

        this.isBusy = true;

        this.account.updatePassword(this.password, this.newPassword)
            .then(() => {
                this.messages.info("Password Change Success", "Your password has been updated.");
                this.onComplete.emit();
            })
            .catch(err => {
                this.messages.error("Password Change Failure", err.message, err);
                this.isBusy = false;
            });
    }

    public onCancel () {
        this.isBusy = false;
        this.onComplete.emit();
    }
}


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-user-profile-password",
    templateUrl: "profile.password.html",
    styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalUserProfilePasswordComponent {

    @Input("user") public user: IUser;

    public isBusy = false;
    public password = "";
    public newPassword = "";
    public newPasswordVerify = "";

    @Output() private onComplete = new EventEmitter<void>();

    constructor(
        @Inject(UserService) private users: UserService,
        @Inject(MessageService) private messages: MessageService,
    ) {}


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }

    public passwordsMatch () {
        return this.newPassword === this.newPasswordVerify;
    }

    public onSubmit () {

        if (! this.newPassword || ! this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }

        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }

        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }

        if (! PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }

        this.isBusy = true;

        this.users.updatePassword(this.user, this.password, this.newPassword)
            .then(() => {
                this.messages.info("Password Change Success", "Your password has been updated.");
                this.onComplete.emit();
            })
            .catch(err => {
                this.messages.error("Password Change Failure", err.message, err);
                this.isBusy = false;
            });
    }

    public onCancel () {
        this.isBusy = false;
        this.onComplete.emit();
    }
}
