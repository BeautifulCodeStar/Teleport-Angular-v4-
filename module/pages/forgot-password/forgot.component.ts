import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";

import { LoginService }    from "../../services/login.service";
import { MessageService }  from "../../services/message.service";

import { EmailValidator } from "../../utils/EmailValidator";



@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-forgot-password",
    templateUrl: "forgot.html",
    // styleUrls  : [ "../css/bootswatch.min.css", "../css/main.min.css" ],
})
export class TeleportDevPortalForgotPasswordComponent {
    
    public userName = "";

    public isBusy = false;
    public isCaptchaOk = false;
    
    private reCaptchaResponse = "";
    private _resetCaptchaObservable: Observable<boolean>;
    private _resetCaptchaObserver: Observer<boolean>;


    constructor (
        @Inject(Router)         private router: Router,
        @Inject(LoginService)   private logins: LoginService,
        @Inject(MessageService) private messages: MessageService,
    ) {
        this._resetCaptchaObservable = Observable.create((observer: Observer<boolean>) => this._resetCaptchaObserver = observer);
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
    
    
    public onRecoverPassword () {
        
        this.isBusy = true;
        this.logins.recoverPassword(this.userName.toLowerCase(), this.reCaptchaResponse)
            .then(resp => {
                console.log("Password Recovery Success", resp);
                this.messages.info("Password Recovery Success", `An email will be sent with recovery instructions.`);
                this.router.navigateByUrl("/login").catch(err => console.error(err));
            })
            .catch(err => {
                console.error("Password Recovery Failure", err);
                this._resetCaptchaObserver.next(true);
                this.isBusy = false;
                this.messages.error("Password Recovery Failure", err.message, err);
            });
    }
}
