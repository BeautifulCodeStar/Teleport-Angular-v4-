import { Http } from "@angular/http";
import { IUser } from "../models/interfaces";
import { AccountService } from "./account.service";
export declare class UserService {
    private http;
    private account;
    private _developer;
    constructor(http: Http, account: AccountService);
    list(): Promise<IUser[]>;
    detail(userId: number): Promise<IUser>;
    create(user: IUser): Promise<IUser>;
    update(user: IUser): Promise<IUser>;
    updatePassword(user: IUser, oldPassword: string, password: string): Promise<IUser>;
    remove(user: IUser): Promise<boolean>;
    sendInvite(user: IUser): Promise<boolean>;
}
