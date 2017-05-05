import { OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { IApplication } from "../../../models/interfaces";
import { ApplicationService } from "../../../services/application.service";
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
    private apps;
    private messages;
    private router;
    private location;
    filters: IFilters;
    private _usage;
    private _apps;
    private _subscription;
    private _isBusy;
    constructor(usage: UsageService, apps: ApplicationService, messages: MessageService, router: Router, location: Location);
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
