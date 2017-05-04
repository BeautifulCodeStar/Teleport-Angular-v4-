import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { IAlert }        from "../../../models/interfaces";
import { AlertsService } from "../../../services/alerts.service";
import { Modal }         from "../../../services/modal.service";


@Component({
    selector   : "ui-alerts",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/profile/profile.alerts.html",
})
export class UIProfileAlerts implements OnInit, OnDestroy {

    private _subscription: Subscription;

    private _alerts: IAlert[] = [];
    private _isBusy = true;

    constructor (
        @Inject(AlertsService) private alerts: AlertsService,
        @Inject(Modal.Service) private modal: Modal.Service
    ) {}

    public ngOnInit () {

        this._isBusy = true;

        this._subscription = this.alerts.Observable
            .filter(a => !! a)
            .subscribe((a: IAlert[]) => {
                this._isBusy = false;
                this._alerts = a;
            });
    }

    public ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._alerts = [];
    }


    public get Alerts () {
        return this._alerts;
    }

    public get isBusy () {
        return this._isBusy;
    }

    public refresh () {
        this.alerts.refresh();
    }

    public onDelete(alert: IAlert) {

        this.modal.show("Delete Alert", `<p>Clicking OK will delete the ${alert.email} alert.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this._alerts = this._alerts.filter(a => a.id !== alert.id);
                    this.alerts.remove(alert)
                        .catch(() => this._alerts.push(alert));
                }
            });
    }
}
