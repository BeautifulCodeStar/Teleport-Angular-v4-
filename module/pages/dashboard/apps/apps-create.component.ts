import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import { ApplicationService } from "../../../services/application.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-apps-create",
    templateUrl: "apps-create.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalAppsCreateComponent {

    public isBusy = false;
    public appName = "";
    public appNotes = "";
    public isCaptchaOk = false;
    public reCaptchaResponse = "";

    constructor (
        @Inject(Router)             private router: Router,
        @Inject(ApplicationService) private applications: ApplicationService,
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
                return this.router.navigate(["/apiv1/applications", app.name]);
            })
            .catch(() => {
                this.isBusy = false;
            });
    }
}
