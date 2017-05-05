import { OnInit, OnDestroy } from "@angular/core";
import { IUser } from "../../../../models/interfaces";
import { AccountService } from "../../../../services/account.service";
import { UserService } from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
export declare class TeleportDevPortalUsersComponent implements OnInit, OnDestroy {
    private account;
    private users;
    private messages;
    isBusy: boolean;
    private _developer;
    private _users;
    constructor(account: AccountService, users: UserService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly Users: IUser[];
    isEditable(user: IUser): boolean;
    resendInvite(user: IUser): void;
}
