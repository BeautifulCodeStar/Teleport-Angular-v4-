import { Http } from "@angular/http";
import { AccountService } from "./account.service";
import { IUserBasicAuth } from "../models/interfaces";
export declare class AccountCredentialsService {
    private http;
    private account;
    private _developer;
    constructor(http: Http, account: AccountService);
    cleanup(): void;
    list(userId: string): Promise<IUserBasicAuth[]>;
    create(userId: string): Promise<IUserBasicAuth[]>;
    remove(userId: string, password: string): Promise<IUserBasicAuth[]>;
}
