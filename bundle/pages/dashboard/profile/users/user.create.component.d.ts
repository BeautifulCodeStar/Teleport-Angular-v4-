import { OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../../../../models/interfaces";
import { AccountService } from "../../../../services/account.service";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
export declare class TeleportDevPortalUserCreateComponent implements OnInit, OnDestroy {
    private router;
    private account;
    private users;
    private messages;
    isBusy: boolean;
    isSendInvite: boolean;
    User: IUser;
    private _developer;
    constructor(router: Router, account: AccountService, users: UserService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isEmailValid(): boolean;
    isUserValid(): boolean;
    onSubmit(): void;
}
