import { Component, Inject } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";

import { LoginService }    from "../../services/login.service";
import { MessageService }  from "../../services/message.service";

import PasswordUtil       from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";
import { IDeveloper }     from "../../models/interfaces";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-login",
    templateUrl: "login.html",
    styleUrls  : [ "../css/bootswatch.min.css", "../css/main.min.css" ],
})
export class TeleportDevPortalLoginComponent {
    
    public userName = "";
    public passWord = "";
    
    public isBusy = false;
    public isCaptchaOk = false;

    public showMultiLogin = false;
    public devLogin: IDeveloper & { authCode: string } | undefined;
    public userLogins: (IDeveloper & { authCode: string })[];
    
    private reCaptchaResponse = "";
    private _resetCaptchaObservable: Observable<boolean>;
    private _resetCaptchaObserver: Observer<boolean>;

    constructor (
        @Inject(LoginService)   private logins: LoginService,
        @Inject(MessageService) private messages: MessageService,
    ) {
        this._resetCaptchaObservable = Observable.create((observer: Observer<boolean>) => this._resetCaptchaObserver = observer);
    }


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }


    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }


    public onCaptcha (resp: string, isOk: boolean) {

        this.reCaptchaResponse = resp;
        this.isCaptchaOk = isOk;
    }


    public resetCaptchaObservable (): Observable<boolean> {
        return this._resetCaptchaObservable;
    }


    public onSubmit () {

        this.isBusy = true;
        this.logins.login(this.userName, this.passWord, this.reCaptchaResponse)
            .then(res => {
                console.log("LOGIN =>", res);
                if (res.developer) {
                    console.log("Login Success", res.developer);
                    this.messages.info(`Welcome, ${res.developer.firstName}.`, "You are now logged in to your account.");
                } else if (res.possibleLogins) {
                    this._resetCaptchaObserver.next(true);
                    this.isCaptchaOk = false;
                    this.isBusy = false;
                    this.showMultiLogin = true;
                    this.devLogin = res.possibleLogins.find(d => d.id === d.developerId);
                    this.userLogins = res.possibleLogins.filter(d => d.id !== d.developerId);
                }
            })
            .catch(err => {
                console.error("Login Failure", err);
                this._resetCaptchaObserver.next(true);
                this.isCaptchaOk = false;
                this.isBusy = false;
                this.messages.error("Login Failure", err.message, err);
            });
    }


    public loginAs (dev: IDeveloper & { authCode: string }) {

        this.isBusy = true;

        this.logins.loginAs(this.userName, this.passWord, dev.id, dev.authCode)
            .then(d => {
                console.log("Login Success", d);
                this.messages.info(`Welcome, ${d.firstName}.`, "You are now logged in to your account.");
            })
            .catch(err => {
                console.error("Login Failure", err);
                this._resetCaptchaObserver.next(true);
                this.isCaptchaOk = false;
                this.isBusy = false;
                this.closeMultiLogin();
                this.messages.error("Login Failure", err.message, err);
            });
    }


    public closeMultiLogin () {
        this.showMultiLogin = false;
        delete this.devLogin;
        delete this.userLogins;
    }
}
