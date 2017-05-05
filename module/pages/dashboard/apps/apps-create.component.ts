import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import { ApplicationService } from "../../../services/application.service";


@Component({
    selector   : "ui-apps-create",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/apps/apps-create.html",
})
export class UIAppsCreate {

    public isBusy = false;
    public appName = "";
    public appNotes = "";
    public isCaptchaOk = false;
    public reCaptchaResponse = "";

    constructor (
        @Inject(Router)             private router: Router,
        @Inject(ApplicationService) private applications: ApplicationService
    ) {}


    public onCaptcha (resp: string, isOk: boolean) {

        this.reCaptchaResponse = resp;
        this.isCaptchaOk = isOk;
    }

    public onSubmitCreateApp () {

        this.isBusy = true;

        this.applications.createApp(this.appName, this.appNotes, this.reCaptchaResponse)
            .then(app => {
                this.isBusy = false;
                this.router.navigate(["/dashboard/applications", app.name]);
            })
            .catch(() => {
                this.isBusy = false;
            });
    }
}
