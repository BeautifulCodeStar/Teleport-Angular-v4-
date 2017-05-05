import { Http } from "@angular/http";
import { IDeveloper, IUser } from "../models/interfaces";
import { SessionService } from "./session.service";
export interface ILoginResponse {
    developer?: IDeveloper;
    possibleLogins?: (IDeveloper & IUser & {
        authCode: string;
    })[];
}
export declare class LoginService {
    private http;
    private session;
    constructor(http: Http, session: SessionService);
    register(dev: any): Promise<boolean>;
    login(userName: string, password: string, reCaptchaResponse: string): Promise<ILoginResponse>;
    loginAs(userName: string, password: string, id: string | number, authCode: string): Promise<IDeveloper>;
    logout(): Promise<boolean>;
    recoverPassword(email: string, reCaptchaResponse: string): Promise<boolean>;
    resetPassword(email: string, password: string, authKey: string, reCaptchaResponse: string): Promise<boolean>;
}
