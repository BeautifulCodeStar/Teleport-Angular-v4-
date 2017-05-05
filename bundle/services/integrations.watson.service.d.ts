import { Http } from "@angular/http";
import { IWatson } from "../models/interfaces";
import { AccountService } from "./account.service";
export interface IWatsonPutRequest {
    textToSpeech: {
        username: string;
        password: string;
    };
}
export declare class IntegrationsWatsonService {
    private http;
    private account;
    private _developer;
    constructor(http: Http, account: AccountService);
    getTextToSpeech(appId: string): Promise<IWatson>;
    putTextToSpeech(appId: string, watson: IWatsonPutRequest): Promise<IWatson>;
    deleteTextToSpeech(appId: string): Promise<IWatson>;
}
