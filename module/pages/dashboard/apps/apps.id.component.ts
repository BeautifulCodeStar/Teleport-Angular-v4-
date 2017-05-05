import { Component, Inject, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute }       from "@angular/router";

import { ApplicationService } from "../../../services/application.service";
import { IApplication }       from "../../../models/interfaces";
import { Modal }              from "../../../services/modal.service";


@Component({
    selector   : "ui-dashboard-app-detail",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/apps/apps.id.html",
})
export class UIAppById implements OnDestroy {

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
    ) {
        this.route.params
            .filter((param: any) => !!param.id)
            .forEach((param: any) => {

                this.isBusy = true;
                apps.getAppByName(param.id)
                    .then(app => {
                        this.appName = app.friendlyName;
                        this.appNotes = app.notes;
                        this._application = app;
                        this.isBusy = false;
                    });
            });
    }

    public ngOnDestroy () {
        this._application = undefined;
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
                        .then(() => this.router.navigate(["/dashboard/applications"]))
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
