import { OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { APIv1State } from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";
import { MessageService } from "../../../services/message.service";
import { UsageService } from "../../../services/usage.service";
export interface IFilters {
    beginDate: string;
    endDate: string;
    appId: string;
}
export interface IUsageView {
    type: "total" | "service" | "location" | "item";
    description: string;
    quantity: number;
    average: number;
    total: number;
}
export declare class TeleportDevPortalDataUsageComponent implements OnInit, OnDestroy {
    usage: UsageService;
    private messages;
    private router;
    private location;
    private store$;
    filters: IFilters;
    private _usage;
    private _apps;
    private _subscription;
    private _isBusy;
    constructor(usage: UsageService, messages: MessageService, router: Router, location: Location, store$: Store<TeleportCoreState & APIv1State>);
    getQueryFromUrl(): [IFilters];
    setQueryOnUrl(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly isBusy: boolean;
    readonly Usage: IUsageView[];
    readonly Apps: IApplication[];
    loadUsage(): void;
    private transformUsage(usage);
    private getNowAndFirst();
}
