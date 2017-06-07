import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute }       from "@angular/router";

import { ApplicationService } from "../../../services/application.service";
import { IApplication }       from "../../../models/interfaces";
import { Modal }              from "../../../services/modal.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-app-detail",
    templateUrl: "apps.id.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalAppByIdComponent implements OnInit, OnDestroy {

    public isBusy = false;
    public isEditing = false;
    public appName = "";
    public appNotes = "";

    private _application: IApplication;

    constructor (
        @Inject(Router)             private router: Router,
        @Inject(ApplicationService) private apps: ApplicationService,
        @Inject(Modal.Service)      private modal: Modal.Service,
        @Inject(ActivatedRoute)     private route: ActivatedRoute,
    ) {}

    public ngOnInit () {

        this.route.params
            .filter((param: any) => !!param.appId)
            .forEach((param: any) => {

                this.isBusy = true;
                this.apps.getAppByName(param.appId)
                    .then(app => {
                        this.appName = app.friendlyName;
                        this.appNotes = app.notes;
                        this._application = app;
                        this.isBusy = false;
                    });
            })
            .catch(err => console.error(err));
    }

    public ngOnDestroy () {
        delete this._application;
        this.isBusy = false;
        this.isEditing = false;
        this.appName = "";
        this.appNotes = "";
    }


    public get App () {
        return this._application;
    }


    public editApp () {
        if (this._application) {
            this.isEditing = true;
            this.appName = this._application.friendlyName;
            this.appNotes = this._application.notes;
        }
    }


    public deleteApp () {

        this.modal.show("Delete Application", `<p>Clicking OK will delete "${this.App.friendlyName}".</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.isBusy = true;
                    this.apps.deleteApp(this.App)
                        .then(() => this.router.navigate(["/apiv1/applications"]))
                        .catch(() => this.isBusy = false);
                }
            });
    }


    public saveChanges () {

        this.isEditing = false;
        this.isBusy = true;

        this.apps.updateApp(this.App, this.appName, this.appNotes)
            .then(app => {
                this._application = app;
                this.isBusy = false;
            })
            .catch(() => this.isBusy = false);
    }


    public cancelChanges () {
        this.isEditing = false;
    }
}
