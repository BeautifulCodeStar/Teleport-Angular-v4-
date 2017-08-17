
import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";
import "rxjs/add/operator/toPromise";

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
})
export class TeleportDevPortalLoginComponent implements OnInit, OnDestroy {
    
    public userName = "";
    public passWord = "";
    
    public isBusy = false;

    public userLogins: i.ILoginAsRequest[];

    constructor (
        @Inject(LoginService)   private logins: LoginService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Store)          private store$: Store<any>,
    ) {}

    
    public ngOnInit () {
        this.userLogins = undefined;
        this.userName = "";
        this.passWord = "";
        this.isBusy = false;
    }

    public ngOnDestroy () {
        this.userLogins = undefined;
        this.userName = "";
        this.passWord = "";
        this.isBusy = false;
    }


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }


    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }


    public onSubmit () {

        this.isBusy = true;
        this.logins.login({ userName: this.userName, password: this.passWord })
            .toPromise()
            .then(res => {

                if (res.v1.length === 1) {
                    this.loginAs(res.v1[0]);
                    return;
                }

                this.userLogins = res.v1;
                this.isBusy = false;
            })
            .catch(err => {
                this.isBusy = false;
                this.messages.error("Login Failure", "The username/password combination was not provided.", err);
            });
    }


    public loginAs (req: i.ILoginAsRequest) {

        this.isBusy = true;

        this.logins.loginAs(req)
            .toPromise()
            .then(res => {
                console.log("Login Success", res);
                this.messages.info(`Welcome, ${res.userData.firstName}.`, "You are now logged in to your account.");
                this.store$.dispatch(new session.actions.LoginAsSuccess(res));
            })
            .catch(err => {
                console.error("Login Failure", err);
                this.isBusy = false;
                this.closeMultiLogin();
                this.messages.error("Login Failure", "The selected user failed to authenticate.", err);
            });
    }


    public closeMultiLogin () {
        this.userLogins = undefined;
    }
}
