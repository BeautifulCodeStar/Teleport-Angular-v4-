import { Component, Inject, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { ApplicationService }       from "../../../services/application.service";
import { IApplication, IDeveloper } from "../../../models/interfaces";
import { SessionService }           from "../../../services/session.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-apps",
    templateUrl: "apps.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalAppsComponent implements OnInit, OnDestroy {

    public Developer: IDeveloper;

    public sortBy = [ this.sortByNameAsc ];
    public filterOn = "";
    public showNum = 20;

    private _applications: IApplication[] = [];
    private _subscription: Subscription;

    private _isBusy = false;

    constructor (
        @Inject(SessionService)     private session: SessionService,
        @Inject(ApplicationService) private applications: ApplicationService,
    ) {}

    public ngOnInit () {

        this._isBusy = true;

        this.session.Observable
            .filter(s => !!s)
            .take(1)
            .subscribe(s => { if (s !== null) { this.Developer = s.developer; } });

        this._subscription = this.applications.Observable
            .filter(a => !! a)
            .subscribe((apps: IApplication[]) => {
                this._isBusy = false;
                this._applications = apps;
            });
    }

    public ngOnDestroy () {
        console.log("Destroy apps.components");
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this.Developer;
        this._applications = [];
        delete this._subscription;
        // Just to shutup the TS checker.
        this.sortBy = [ this.sortByNameDesc, this.sortByNotesAsc, this.sortByNotesDesc, this.sortByCreatedOnAsc, this.sortByCreatedOnDesc ];
    }

    public get isBusy () {
        return this._isBusy;
    }

    public get totalApps () {
        return this._applications.length;
    }

    public get Applications () {
        return this.sortBy
            .reduce((apps, s) => apps.sort(s), this._applications.slice(0))
            .filter(app => ["friendlyName", "notes", "name"].some(param => (app as any)[param].toLowerCase().includes(this.filterOn.toLowerCase())))
            .slice(0, this.showNum);
    }

    public requestAppsRefresh () {
        this.applications.refreshApps();
    }


    public hasSort (funcName: string) {
        return this.sortBy.indexOf((this as any)[funcName]) !== -1;
    }

    public toggleSort (param: string) {

        if (this.hasSort(`sortBy${param}Asc`)) {
            this.sortBy.splice(this.sortBy.indexOf((this as any)[`sortBy${param}Asc`]), 1);
            this.sortBy.push((this as any)[`sortBy${param}Desc`]);
        } else if (this.hasSort(`sortBy${param}Desc`)) {
            this.sortBy.splice(this.sortBy.indexOf((this as any)[`sortBy${param}Desc`]), 1);
        } else {
            this.sortBy.push((this as any)[`sortBy${param}Asc`]);
        }
    }


    private sortByNameAsc (a: IApplication, b: IApplication) {
        return a.friendlyName.localeCompare(b.friendlyName);
    }

    private sortByNameDesc (a: IApplication, b: IApplication) {
        return b.friendlyName.localeCompare(a.friendlyName);
    }

    private sortByNotesAsc (a: IApplication, b: IApplication) {
        return a.notes.localeCompare(b.notes);
    }

    private sortByNotesDesc (a: IApplication, b: IApplication) {
        return b.notes.localeCompare(a.notes);
    }

    private sortByCreatedOnAsc (a: IApplication, b: IApplication) {
        return +a.createdAt - +b.createdAt;
    }

    private sortByCreatedOnDesc (a: IApplication, b: IApplication) {
        return +b.createdAt - +a.createdAt;
    }
}
