import { OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { LoginService } from "../../services/login.service";
import { MessageService } from "../../services/message.service";
export declare class TeleportDevPortalRecoverPasswordComponent implements OnInit, OnDestroy {
    private route;
    private logins;
    private messages;
    isBusy: boolean;
    isSuccess: boolean;
    email: string;
    newPassword: string;
    newPasswordVerify: string;
    isCaptchaOk: boolean;
    private reCaptchaResponse;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(route: ActivatedRoute, logins: LoginService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    passwordsMatch(): boolean;
    onCaptcha(token: string, val: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onSubmit(): void;
}
