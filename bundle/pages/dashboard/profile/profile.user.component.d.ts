import { OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../../services/account.service";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import { Modal } from "../../../services/modal.service";
import { IUser } from "../../../models/interfaces";
export declare class TeleportDevPortalUserProfileComponent implements OnInit, OnDestroy {
    private router;
    private account;
    private users;
    private modal;
    private messages;
    User: IUser;
    isBusy: boolean;
    isEditProfile: boolean;
    isChangePassword: boolean;
    private _user;
    private _subscription;
    constructor(router: Router, account: AccountService, users: UserService, modal: Modal.Service, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onStartEditMode(): void;
    closePasswordForm(): void;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
    onDelete(): void;
    onCancel(): void;
}
