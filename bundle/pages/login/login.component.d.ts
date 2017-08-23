import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/first";
import { Store } from "@ngrx/store";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import * as i from "teleport-module-services/services/services/login/login.service.interface";
import { MessageService } from "../../services/message.service";
export declare class TeleportDevPortalLoginComponent {
    private logins;
    private messages;
    private store$;
    userName: string;
    passWord: string;
    isBusy: BehaviorSubject<boolean>;
    userLogins: BehaviorSubject<i.ILoginAsRequest[]>;
    constructor(logins: LoginService, messages: MessageService, store$: Store<any>);
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
    loginAs(req: i.ILoginAsRequest): void;
    closeMultiLogin(): void;
}
