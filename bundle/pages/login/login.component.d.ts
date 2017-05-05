import { Observable } from "rxjs/Observable";
import { LoginService } from "../../services/login.service";
import { MessageService } from "../../services/message.service";
import { IDeveloper } from "../../models/interfaces";
export declare class TeleportDevPortalLoginComponent {
    private logins;
    private messages;
    userName: string;
    passWord: string;
    isBusy: boolean;
    isCaptchaOk: boolean;
    showMultiLogin: boolean;
    devLogin: IDeveloper & {
        authCode: string;
    } | undefined;
    userLogins: (IDeveloper & {
        authCode: string;
    })[];
    private reCaptchaResponse;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(logins: LoginService, messages: MessageService);
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    onCaptcha(resp: string, isOk: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onSubmit(): void;
    loginAs(dev: IDeveloper & {
        authCode: string;
    }): void;
    closeMultiLogin(): void;
}
