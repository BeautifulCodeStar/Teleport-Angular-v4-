import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Location }                             from "@angular/common";
import { Router }                               from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { ILog, IApplication }                       from "../../../models/interfaces";
import { LogsService, ILogsResponse, ILogsRequest } from "../../../services/logs.service";
import { ApplicationService }                       from "../../../services/application.service";
import { MessageService }                           from "../../../services/message.service";


@Component({
    selector   : "ui-data-logs",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/data/data.logs.html",
})
export class UIDataLogs implements OnInit, OnDestroy {

    public filters: ILogsRequest;

    private _logs: ILogsResponse;
    private _apps: IApplication[];
    private _subscriptions: Subscription[];

    private _isBusy = false;

    private _sortFuncs: { [key: string]: (a: ILog, b: ILog) => number } = {
        "callIdDesc"    : (a: ILog, b: ILog) => b.call_id.localeCompare(a.call_id),
        "callIdAsc"     : (a: ILog, b: ILog) => a.call_id.localeCompare(b.call_id),
        "apiNoDesc"     : (a: ILog, b: ILog) => b.api_no.localeCompare(a.api_no),
        "apiNoAsc"      : (a: ILog, b: ILog) => a.api_no.localeCompare(b.api_no),
        "callerNoDesc"  : (a: ILog, b: ILog) => b.caller_no.localeCompare(a.caller_no),
        "callerNoAsc"   : (a: ILog, b: ILog) => a.caller_no.localeCompare(b.caller_no),
        "typeDesc"      : (a: ILog, b: ILog) => b.type.localeCompare(a.type),
        "typeAsc"       : (a: ILog, b: ILog) => a.type.localeCompare(b.type),
        "statusDesc"    : (a: ILog, b: ILog) => b.status.localeCompare(a.status),
        "statusAsc"     : (a: ILog, b: ILog) => a.status.localeCompare(b.status),
        "directionDesc" : (a: ILog, b: ILog) => b.direction.localeCompare(a.direction),
        "directionAsc"  : (a: ILog, b: ILog) => a.direction.localeCompare(b.direction),
        "durationDesc"  : (a: ILog, b: ILog) => +b.duration - +a.duration,
        "durationAsc"   : (a: ILog, b: ILog) => +a.duration - +b.duration,
        "startTimeDesc" : (a: ILog, b: ILog) => +b.start_time - +a.start_time,
        "startTimeAsc"  : (a: ILog, b: ILog) => +a.start_time - +b.start_time,
        "endTimeDesc"   : (a: ILog, b: ILog) => +b.end_time - +a.end_time,
        "endTimeAsc"    : (a: ILog, b: ILog) => +a.end_time - +b.end_time,
        "appIdDesc"     : (a: ILog, b: ILog) => b.app_id.localeCompare(a.app_id),
        "appIdAsc"      : (a: ILog, b: ILog) => a.app_id.localeCompare(b.app_id),
        "billedTimeDesc": (a: ILog, b: ILog) => +b.connect_time_billed - +a.connect_time_billed,
        "billedTimeAsc" : (a: ILog, b: ILog) => +a.connect_time_billed - +b.connect_time_billed,
        "originApiDesc" : (a: ILog, b: ILog) => b.origin_api.localeCompare(a.origin_api),
        "originApiAsc"  : (a: ILog, b: ILog) => a.origin_api.localeCompare(b.origin_api),
    };
    private _sortOn = "startTimeDesc";

    constructor (
        @Inject(LogsService)        private logs: LogsService,
        @Inject(ApplicationService) private apps: ApplicationService,
        @Inject(MessageService)     private messages: MessageService,
        @Inject(Router)             private router: Router,
        @Inject(Location)           private location: Location
    ) {}


    public getQueryFromUrl (): [ILogsRequest, string] {

        const params = this.router.parseUrl(this.router.url).queryParams as any;
        const now = new Date();
        const filters: ILogsRequest = {
            beginDate   : params.beginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7).toLocaleString(),
            endDate     : params.endDate || now.toLocaleString(),
            appId       : params.appId || "",
            direction   : (params.direction || "both") as ("inbound" | "outbound" | "both"),
            connectTime : +params.connectTime || 0,
        };

        const sortOn = params.sortOn || "startTimeDesc";

        return [ filters, sortOn ];
    }


    public setQueryOnUrl () {

        this.location.replaceState(
            (window.location as any).pathname,
            Object.keys(this.filters).reduce((p: string, c: string) => `${p}&${c}=${encodeURIComponent(String((this.filters as any)[c]))}`, `sortOn=${this._sortOn}`)
        );
    }


    public ngOnInit () {

        [ this.filters, this._sortOn ] = this.getQueryFromUrl();

        this._isBusy = true;

        this._subscriptions = [

            this.logs.Observable
                .filter(a => !! a)
                .subscribe((logs: ILogsResponse) => {
                    this._isBusy = false;
                    this._logs = logs;
                    this.sortLogs();
                    this.filters.beginDate = new Date(String(logs.beginDate)).toLocaleString();
                    this.filters.endDate = new Date(String(logs.endDate)).toLocaleString();
                }),

            this.apps.Observable
                .filter(a => !! a)
                .subscribe(apps => this._apps = apps),
        ];

        setImmediate(() => this.loadLogs());
    }

    public ngOnDestroy () {

        if (this._subscriptions) {
            this._subscriptions.forEach(s => s.unsubscribe());
        }
        this._logs = undefined;
        this._apps = undefined;
    }

    public get isBusy () {
        return this._isBusy;
    }

    public get Logs () {
        return this._logs && this._logs.logs || [];
    }

    public get isTruncated () {
        return this._logs && this._logs.isTruncated;
    }

    public get Apps () {
        return this._apps || [];
    }

    public sortLogs (sortOn?: string) {
        if (sortOn) {
            let isAsc = this._sortOn.slice(-3) === "Asc";
            if (this._sortOn.startsWith(sortOn)) {
                this._sortOn = sortOn + (isAsc ? "Desc" : "Asc");
            } else {
                this._sortOn = sortOn + "Desc";
            }
        }
        this._logs.logs = this._logs.logs.sort(this._sortFuncs[this._sortOn]);
    }
    
    public isSortOn (name: string) {
        return this._sortOn === name;
    }

    public loadLogs () {

        try {

            let filter = Object.assign({}, this.filters);
            filter.beginDate = filter.beginDate ? new Date(String(filter.beginDate)) : new Date(Date.now() - 1000 * 60 * 60);
            filter.endDate = filter.endDate ? new Date(String(filter.endDate)) : new Date();

            if (filter.beginDate >= filter.endDate) {
                this.messages.error("Logs Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }

            this.setQueryOnUrl();

            this._isBusy = true;
            this.logs.loadLogs(filter)
                .then(() => this._isBusy = false)
                .catch(err => {
                    this._isBusy = false;
                    this.messages.error("Logs Failure", err.message, err);
                });

        } catch (err) {
            console.error(err);
            this._isBusy = false;
            this.messages.error("Logs Failure", err.message, err);
        }
    }
}
