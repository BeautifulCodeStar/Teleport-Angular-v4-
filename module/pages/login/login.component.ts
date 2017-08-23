
import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";
import "rxjs/add/operator/first";

import { Store } from "@ngrx/store";

import { session } from "teleport-module-services/services/ngrx";

import { LoginService } from "teleport-module-services/services/services/login/login.service";
import * as i from "teleport-module-services/services/services/login/login.service.interface";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";

import { MessageService }  from "../../services/message.service";

import PasswordUtil       from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-login",
    templateUrl: "login.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeleportDevPortalLoginComponent {
    
    public userName = "";
    public passWord = "";
    
    public isBusy = new BehaviorSubject<boolean>(false);

    public userLogins = new BehaviorSubject<i.ILoginAsRequest[]>([]);

    constructor (
        @Inject(LoginService)   private logins: LoginService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Store)          private store$: Store<any>,
    ) {}


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }


    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }


    public onSubmit () {

        this.isBusy.next(true);
        this.logins.login({ userName: this.userName, password: this.passWord })
            .first()
            .subscribe(
                res => {

                    if (res.v1.length === 1) {
                        this.loginAs(res.v1[0]);
                        return;
                    }

                    this.userLogins.next(res.v1);
                    this.isBusy.next(false);
                },
                err => {
                    this.userLogins.next([]);
                    this.isBusy.next(false);
                    this.messages.error("Login Failure", "The username/password combination was not provided.", err);
                },
            );
    }


    public loginAs (req: i.ILoginAsRequest) {

        this.isBusy.next(true);

        this.logins.loginAs(req)
            .first()
            .subscribe(
                res => {
                    console.log("Login Success", res);
                    this.messages.info(`Welcome, ${res.userData.firstName}.`, "You are now logged in to your account.");
                    this.store$.dispatch(new session.actions.LoginAsSuccess(res));
                },
                err => {
                    console.error("Login Failure", err);
                    this.isBusy.next(false);
                    this.closeMultiLogin();
                    this.messages.error("Login Failure", "The selected user failed to authenticate.", err);
                },
            );
    }


    public closeMultiLogin () {
        this.userLogins.next([]);
    }
}
