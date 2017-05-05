import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IApplication, IAppCredentials } from "../models/interfaces";
import { AccountService } from "./account.service";
import { MessageService } from "./message.service";
export declare class ApplicationService {
    private http;
    private account;
    private message;
    private _observable;
    private _observer;
    private _subscription;
    private _developer;
    private _applications;
    private _lastRefresh;
    constructor(http: Http, account: AccountService, message: MessageService);
    cleanup(): void;
    readonly Observable: Observable<IApplication[]>;
    refreshApps(): void;
    getAppByName(appName: string): Promise<IApplication>;
    createApp(appName: string, notes?: string, reCaptchaResponse?: string): Promise<IApplication>;
    updateApp(app: IApplication, appName: string, notes?: string): Promise<IApplication>;
    deleteApp(app: IApplication): Promise<boolean>;
    createAppCredentials(app: IApplication): Promise<IApplication>;
    deleteAppCredentials(app: IApplication, creds: IAppCredentials): Promise<boolean>;
}
