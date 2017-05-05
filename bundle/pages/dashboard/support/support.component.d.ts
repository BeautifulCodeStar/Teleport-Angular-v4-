import { OnInit, OnDestroy } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AccountService } from "../../../services/account.service";
import { MessageService } from "../../../services/message.service";
import { ApplicationService } from "../../../services/application.service";
import { IApplication } from "../../../models/interfaces";
export declare class TeleportDevPortalSupportFormComponent implements OnInit, OnDestroy {
    private http;
    account: AccountService;
    private apps;
    private messages;
    form: {
        account: string;
        app: string;
        name: string;
        email: string;
        phone: string;
        topic: string;
        priority: string;
        description: string;
        "g-recaptcha-response": string;
    };
    Applications: IApplication[];
    isSubmitted: boolean;
    isSuccess: boolean;
    isCaptchaOk: boolean;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(http: Http, account: AccountService, apps: ApplicationService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isEmailValid(email: string): boolean;
    onCaptcha(token: string, val: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onSubmit(): void;
}
