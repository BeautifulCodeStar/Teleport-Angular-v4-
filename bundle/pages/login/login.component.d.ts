import { OnInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import * as i from "teleport-module-services/services/services/login/login.service.interface";
import { MessageService } from "../../services/message.service";
export declare class TeleportDevPortalLoginComponent implements OnInit, OnDestroy {
    private logins;
    private messages;
    userName: string;
    passWord: string;
    isBusy: boolean;
    userLogins: i.ILoginAsRequest[];
    constructor(logins: LoginService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
    loginAs(req: i.ILoginAsRequest): void;
    closeMultiLogin(): void;
}
