import {Component, Inject, OnInit, OnDestroy} from "@angular/core";

import {Subscription} from "rxjs/Subscription";

import {AccountService}    from "../../../services/account.service";
import {IDeveloper}        from "../../../models/interfaces";
import {Developer}         from "../../../models/Developer";


@Component({
    selector   : "ui-account",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/account/account.html",
})
export class UIAccount implements OnInit, OnDestroy {

    public isBusy = false;
    public isChangePassword = false;

    private _developer: Developer;
    private _subscription: Subscription;

    constructor (
        @Inject(AccountService) private account: AccountService
    ) {}

    public ngOnInit () {

        this._subscription = this.account.Observable
            .skipWhile(d => ! d)
            .subscribe(dev => this._developer = new Developer(dev));
    }

    public ngOnDestroy () {
        console.log("UIProfile Destroy");
        if (this._subscription) { this._subscription.unsubscribe(); }
        this._developer = undefined;
    }


    public get Developer (): IDeveloper {
        return this._developer;
    }

}
