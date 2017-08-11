import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";
import "rxjs/add/operator/toPromise";

import { LoginService } from "teleport-module-services/services/services/login/login.service";
import * as i from "teleport-module-services/services/services/login/login.service.interface";

import { MessageService }  from "../../services/message.service";

import { EmailValidator } from "../../utils/EmailValidator";



@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-forgot-password",
    templateUrl: "forgot.html",
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

        this.logins.recoverPassword({ email: this.userName, reCaptchaResponse: this.reCaptchaResponse })
            .toPromise()
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
