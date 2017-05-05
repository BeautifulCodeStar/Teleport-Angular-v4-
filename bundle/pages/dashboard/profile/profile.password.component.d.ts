import { IUser } from "../../../models/interfaces";
import { AccountService } from "../../../services/account.service";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
export declare class TeleportDevPortalProfilePasswordComponent {
    private account;
    private messages;
    isBusy: boolean;
    password: string;
    newPassword: string;
    newPasswordVerify: string;
    private onComplete;
    constructor(account: AccountService, messages: MessageService);
    isPasswordValid(pw: string): boolean;
    passwordsMatch(): boolean;
    onSubmit(): void;
    onCancel(): void;
}
export declare class TeleportDevPortalUserProfilePasswordComponent {
    private users;
    private messages;
    user: IUser;
    isBusy: boolean;
    password: string;
    newPassword: string;
    newPasswordVerify: string;
    private onComplete;
    constructor(users: UserService, messages: MessageService);
    isPasswordValid(pw: string): boolean;
    passwordsMatch(): boolean;
    onSubmit(): void;
    onCancel(): void;
}
