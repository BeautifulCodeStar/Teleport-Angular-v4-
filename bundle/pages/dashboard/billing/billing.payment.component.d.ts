import { AfterViewInit, OnDestroy, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { BillingService } from "../../../services/billing.service";
import { MessageService } from "../../../services/message.service";
import { Modal } from "../../../services/modal.service";
export declare class TeleportDevPortalBillingPaymentComponent implements AfterViewInit, OnDestroy {
    private router;
    private billing;
    private messages;
    private modal;
    private zone;
    isReady: boolean;
    isBusy: boolean;
    amount: number;
    private _checkout;
    constructor(router: Router, billing: BillingService, messages: MessageService, modal: Modal.Service, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onCancel(): void;
    onSubmit(nonce: string, method: string, type: string, lastFour: string): void;
}
