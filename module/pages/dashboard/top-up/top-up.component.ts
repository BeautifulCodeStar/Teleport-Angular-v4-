import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { TopUpService }   from "../../../services/top-up.service";
import { MessageService } from "../../../services/message.service";

import { ITopUp } from "../../../models/interfaces";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-top-up",
    templateUrl: "top-up.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalTopUpComponent implements OnInit, OnDestroy {

    public TopUp: ITopUp;

    public isEditTopUp = false;
    public isBusy = false;

    private _topup: ITopUp;
    private _subscription: Subscription;

    constructor (
        @Inject(TopUpService)   private topUp: TopUpService,
        @Inject(MessageService) private messages: MessageService,
    ) {}

    public ngOnInit () {

        this.isBusy = true;
        this._subscription = this.topUp.Observable
            .skipWhile(resp => ! resp)
            .subscribe(
                resp => {
                    this._topup = resp;
                    this.isBusy = false;
                    this.isEditTopUp = false;
                    this.TopUp = Object.assign({}, this._topup);
                },
                err => {
                    this.messages.error("Top Up Error", err.message, err);
                    this.isBusy = false;
                    this.TopUp = Object.assign({}, this._topup);
                },
            );
    }

    public ngOnDestroy () {
        if (this._subscription) { this._subscription.unsubscribe(); }
    }

    public onStartEditMode() {
        this.isEditTopUp = true;
        this.TopUp = Object.assign({}, this._topup);
        this.TopUp.amount = this._topup.amount || 10;
        this.TopUp.balanceThreshold = this._topup.balanceThreshold || 10;
        this.TopUp.maxAmountPerDay = this._topup.maxAmountPerDay || 20;
    }


    public validateAmount (): string | null {

        if (this.TopUp.amount < 10) { return `The amount must be more than $10.`; }
        if (this.TopUp.amount < this.TopUp.balanceThreshold / 4) {
            return `The automatic charge cannot be less than 1/4 of the balance threshold (currently \$${(this.TopUp.balanceThreshold / 4).toFixed(2)}).`;
        }
        if (this.TopUp.amount > this.TopUp.maxAmountPerDay) {
            return `The automatic charge cannot be greater then the total charges per day limit.`;
        }
        return null;
    }

    public validateThreshold (): string | null {

        // The threshold needs some lower limit.
        if (this.TopUp.balanceThreshold < 10) {
            return `The balance threshold cannot be less than $10.`;
        }
        // The threshold needs an upper limit. Why not the daily spend limit?
        if (this.TopUp.balanceThreshold > this._topup.maxAmountPerDayLimit) {
            return `The balance threshold cannot exceed the daily spend limit.`;
        }

        return null;
    }

    public validateMaxDaily (): string | null {

        // How can the daily limit be less than the one-time charge.
        if (this.TopUp.maxAmountPerDay < this.TopUp.amount) {
            return `The max total charged per day cannot be less then the automatic charge amount.`;
        }
        // Why get charged more per day than you can spend per day?
        if (this.TopUp.maxAmountPerDay > this._topup.maxAmountPerDayLimit) {
            return `The max total charged per day cannot exceed the daily spend limit.`;
        }

        return null;
    }


    public onCancel () {
        this.isEditTopUp = false;
        this.TopUp = Object.assign({}, this._topup);
    }

    public onDeactivate () {
        this.TopUp.amount = 0;
        this.TopUp.maxAmountPerDay = 0;
        this.TopUp.balanceThreshold = 0;
        this.onSubmit();
    }

    public onSubmit () {

        this.isBusy = true;
        this.isEditTopUp = false;

        this.topUp.updateTopUp(this.TopUp);

        if (this.TopUp.amount > 0) {
            this.messages.info(
                "Top-Up Updated!",
                `An amount of $${this.TopUp.amount.toFixed(2)} will automatically be charged while the balance is lower than $${this.TopUp.balanceThreshold.toFixed(2)}.`,
            );
        }
    }
}
