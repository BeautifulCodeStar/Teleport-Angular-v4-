
import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Location }                             from "@angular/common";
import { Router }                               from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { IApplication, IUsageAggregateData } from "../../../models/interfaces";
import { ApplicationService }                from "../../../services/application.service";
import { MessageService }                    from "../../../services/message.service";

import { UsageService, IUsageRequest, IUsageResponse } from "../../../services/usage.service";


interface IFilters {
    beginDate: string;
    endDate: string;
    appId: string;
}

interface IUsageView {
    type: "total" | "service" | "location" | "item";
    description: string;
    quantity: number;
    average: number;
    total: number;
}

@Component({
    selector   : "ui-data-usage",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/data/data.usage.html",
})
export class UIDataUsage implements OnInit, OnDestroy {

    public filters: IFilters;

    private _usage: IUsageView[];
    private _apps: IApplication[];
    private _subscription: Subscription;

    private _isBusy = false;


    constructor (
        @Inject(UsageService)       private usage: UsageService,
        @Inject(ApplicationService) private apps: ApplicationService,
        @Inject(MessageService)     private messages: MessageService,
        @Inject(Router)             private router: Router,
        @Inject(Location)           private location: Location,
    ) {}


    public getQueryFromUrl (): [IFilters] {

        const params = this.router.parseUrl(this.router.url).queryParams as any;
        const filters: IFilters = {
            beginDate   : params.beginDate,
            endDate     : params.endDate,
            appId       : params.appId || "",
        };

        return [ filters ];
    }


    public setQueryOnUrl () {

        this.location.replaceState(
            (window.location as any).pathname,
            `beginDate=${encodeURIComponent(this.filters.beginDate)}&endDate=${encodeURIComponent(this.filters.endDate)}&appId=${this.filters.appId}`,
        );
    }


    public ngOnInit () {

        [ this.filters ] = this.getQueryFromUrl();

        this._isBusy = true;

        this._subscription = this.apps.Observable
                .filter(a => !! a)
                .subscribe(apps => this._apps = apps);

        setImmediate(() => this.loadUsage());
    }


    public ngOnDestroy () {

        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._usage = undefined;
        this._apps = undefined;
    }


    public get isBusy () {
        return this._isBusy;
    }


    public get Usage (): IUsageView[] {
        return this._usage;
    }


    public get Apps () {
        return this._apps || [];
    }


    public loadUsage (): void {

        try {

            const [now, first] = this.getNowAndFirst();
            const req: IUsageRequest = {
                beginDate: this.filters.beginDate ? new Date(this.filters.beginDate) : first,
                endDate: this.filters.endDate ? new Date(this.filters.endDate) : now,
                appId: this.filters.appId || "",
            };

            if (isNaN(req.beginDate.getTime()) || isNaN(req.endDate.getTime())) {
                this.messages.error("Usage Failure", "The Begin and/or End Dates are invalid.");
                return;
            }
            if (req.beginDate >= req.endDate) {
                this.messages.error("Usage Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }
            if (req.endDate.getTime() - req.beginDate.getTime() > 1000 * 60 * 60 * 24 * 31) {
                this.messages.error("Usage Failure", "The Begin Date and End Date cannot span more that a month.");
                return;
            }

            this._isBusy = true;
            this.usage.pullUsage(req)
                .then((u: IUsageResponse) => {
                    this._isBusy = false;
                    this.filters.beginDate = new Date(u.beginDate).toLocaleString();
                    this.filters.endDate = new Date(u.endDate).toLocaleString();
                    this._usage = this.transformUsage(u.usage);
                    this.setQueryOnUrl();
                })
                .catch(err => {
                    this._isBusy = false;
                    this.messages.error("Usage Failure", err.message, err);
                });

        } catch (err) {
            console.error(err);
            this._isBusy = false;
            this.messages.error("Usage Failure", err.message, err);
        }
    }


    private transformUsage (usage: IUsageAggregateData[]): IUsageView[] {

        const usageView: IUsageView[] = [{
            type: "total",
            description: "",
            quantity: 0,
            average: 0,
            total: 0,
        }];

        usage.sort((a, b) => a.service_label.localeCompare(b.service_label))
            .forEach(service => {

                usageView[0].quantity += service.quantity;
                usageView[0].total += service.price_total;

                usageView.push({
                    type: "service",
                    description: service.service_label,
                    quantity: service.quantity,
                    average: service.price_total / service.quantity,
                    total: service.price_total,
                });

                service.locations.sort((a, b) => a.country_label.localeCompare(b.country_label))
                    .forEach(location => {

                        usageView.push({
                            type: "location",
                            description: location.country_label,
                            quantity: location.quantity,
                            average: location.price_total / location.quantity,
                            total: location.price_total,
                        });

                        location.items.sort((a, b) => a.label.localeCompare(b.label))
                            .forEach(item => {

                                usageView.push({
                                    type: "item",
                                    description: item.label,
                                    quantity: item.quantity,
                                    average: item.price_total / item.quantity,
                                    total: item.price_total,
                                });
                            });
                    });
            });

        usageView[0].average = usageView[0].quantity ? usageView[0].total / usageView[0].quantity : 0;
        return usageView;
    }


    private getNowAndFirst (): [ Date, Date ] {

        const now = new Date();
        const first = new Date();
        first.setDate(1);
        first.setHours(0, 0, 0, 0);
        return [ now, first ];
    }
}
