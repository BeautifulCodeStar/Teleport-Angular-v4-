import { OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../../services/account.service";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
import { IDeveloper } from "../../../models/interfaces";
export declare class TeleportDevPortalProfileComponent implements OnInit, OnDestroy {
    private router;
    private account;
    private modal;
    private messages;
    Developer: IDeveloper;
    isBusy: boolean;
    isEditProfile: boolean;
    isChangePassword: boolean;
    private _developer;
    private _subscription;
    constructor(router: Router, account: AccountService, modal: ModalService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onStartEditMode(): void;
    closePasswordForm(): void;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
    onDelete(): void;
    onCancel(): void;
}
