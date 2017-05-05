import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ITopUp } from "../models/interfaces";
import { AccountService } from "./account.service";
export declare class TopUpService {
    private http;
    private account;
    private _developer;
    private _topUp;
    private _observable;
    private _observer;
    constructor(http: Http, account: AccountService);
    readonly Observable: Observable<ITopUp>;
    refresh(): void;
    updateTopUp(data: ITopUp): void;
}
