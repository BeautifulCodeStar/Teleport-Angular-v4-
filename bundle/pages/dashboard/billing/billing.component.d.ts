import { OnInit, OnDestroy } from "@angular/core";
import { IPayment } from "../../../models/interfaces";
import { BillingService } from "../../../services/billing.service";
export declare class TeleportDevPortalBillingComponent implements OnInit, OnDestroy {
    private billing;
    view: {
        historyFrom: Date;
        historyTo: Date;
        isBusy: boolean;
        isPaymentFormOpen: boolean;
    };
    private _subscription;
    private _balance;
    private _payments;
    constructor(billing: BillingService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    historyTo: string;
    historyFrom: string;
    readonly balance: number;
    readonly Payments: IPayment[];
    reloadPaymentHistory(): Promise<void>;
}
