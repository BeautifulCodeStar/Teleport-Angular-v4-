import { Component, Inject, Input, OnDestroy } from "@angular/core";

import { ApplicationService }            from "../../../services/application.service";
import { IApplication, IAppCredentials } from "../../../models/interfaces";
import { Modal }                         from "../../../services/modal.service";


@Component({
    selector   : "ui-dashboard-app-credentials",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/apps/apps.credentials.html",
})
export class UIAppCredentials implements OnDestroy {

    @Input() public set app (a: IApplication) {
        this.Credentials = a.credentials;
        this._app = a;
    };

    public isBusy = false;
    public Credentials: IAppCredentials[] = [];

    private _app: IApplication;

    constructor (
        @Inject(ApplicationService) private applications: ApplicationService,
        @Inject(Modal.Service)      private modal: Modal.Service
    ) {
        console.log("new UIAppCredentials ()", this._app, arguments);
    }


    public ngOnDestroy () {
        this._app = undefined;
        this.Credentials = [];
    }


    public createCred () {

        this.isBusy = true;

        this.applications.createAppCredentials(this._app)
            .then(app => {
                this.isBusy = false;
                this.app = app;
            })
            .catch(() => this.isBusy = false);
    }

    public deleteCred (cred: IAppCredentials) {

        this.modal.show("Delete Credential", `<p>Clicking OK will delete the "${cred.apiKey}" credential.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.isBusy = true;

                    this.applications.deleteAppCredentials(this._app, cred)
                        .then(() => {
                            this.isBusy = false;
                            this.Credentials = this.Credentials.filter(c => c.apiKey !== cred.apiKey);
                        })
                        .catch(() => this.isBusy = false);
                }
            });
    }

    public apiKeyInputFocus (event: FocusEvent) {
        (<HTMLInputElement> event.target).type = "text";
        (<HTMLInputElement> event.target).select();
    }

    public apiKeyInputBlur (event: FocusEvent) {
        (<HTMLInputElement> event.target).type = "password";
    }
}
