import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import { MessageService } from "../../services/message.service";
export declare class TeleportDevPortalForgotPasswordComponent {
    private router;
    private logins;
    private messages;
    userName: string;
    isBusy: boolean;
    isCaptchaOk: boolean;
    private reCaptchaResponse;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(router: Router, logins: LoginService, messages: MessageService);
    isEmailValid(email: string): boolean;
    onCaptcha(resp: string, isOk: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onRecoverPassword(): void;
}
