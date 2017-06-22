import { AfterViewInit, OnDestroy } from "@angular/core";
import { IUserBasicAuth } from "../../../models/interfaces";
import { AccountService } from "../../../services/account.service";
import { AccountCredentialsService } from "../../../services/account.credentials.service";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
export declare class TeleportDevPortalProfileBasicAuthComponent implements AfterViewInit, OnDestroy {
    private account;
    private creds;
    private modal;
    private messages;
    isBusy: boolean;
    Credentials: IUserBasicAuth[];
    private _userId;
    constructor(account: AccountService, creds: AccountCredentialsService, modal: ModalService, messages: MessageService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    create(): void;
    remove(cred: IUserBasicAuth): void;
    apiKeyInputFocus(event: FocusEvent): void;
    apiKeyInputBlur(event: FocusEvent): void;
}
