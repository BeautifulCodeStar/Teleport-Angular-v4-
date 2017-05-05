import { OnInit, OnDestroy } from "@angular/core";
import { TopUpService } from "../../../services/top-up.service";
import { MessageService } from "../../../services/message.service";
import { ITopUp } from "../../../models/interfaces";
export declare class TeleportDevPortalTopUpComponent implements OnInit, OnDestroy {
    private topUp;
    private messages;
    TopUp: ITopUp;
    isEditTopUp: boolean;
    isBusy: boolean;
    private _topup;
    private _subscription;
    constructor(topUp: TopUpService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onStartEditMode(): void;
    validateAmount(): string | null;
    validateThreshold(): string | null;
    validateMaxDaily(): string | null;
    onCancel(): void;
    onDeactivate(): void;
    onSubmit(): void;
}
