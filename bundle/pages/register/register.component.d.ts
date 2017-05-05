import { OnInit, OnDestroy } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { MessageService } from "../../services/message.service";
import { Observable } from "rxjs/Observable";
export declare class TeleportDevPortalRegisterComponent implements OnInit, OnDestroy {
    private logins;
    private messages;
    form: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        passwordVerify: string;
        phoneNo: string;
        company: string;
        interests: {};
        "g-recaptcha-response": string;
    };
    isSubmitted: boolean;
    isSuccess: boolean;
    isCaptchaOk: boolean;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(logins: LoginService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    passwordsMatch(): boolean;
    onCaptcha(token: string, val: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onSubmit(): void;
}
