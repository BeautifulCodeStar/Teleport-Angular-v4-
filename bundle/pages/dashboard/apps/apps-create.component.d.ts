import { Router } from "@angular/router";
import { ApplicationService } from "../../../services/application.service";
export declare class TeleportDevPortalAppsCreateComponent {
    private router;
    private applications;
    isBusy: boolean;
    appName: string;
    appNotes: string;
    isCaptchaOk: boolean;
    reCaptchaResponse: string;
    constructor(router: Router, applications: ApplicationService);
    onCaptcha(resp: string, isOk: boolean): void;
    onSubmitCreateApp(): void;
}
