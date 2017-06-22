import { OnDestroy } from "@angular/core";
import { ApplicationService } from "../../../services/application.service";
import { IApplication, IAppCredentials } from "../../../models/interfaces";
import { ModalService } from "../../../services/modal.service";
export declare class TeleportDevPortalAppCredentialsComponent implements OnDestroy {
    private applications;
    private modal;
    app: IApplication;
    isBusy: boolean;
    Credentials: IAppCredentials[];
    private _app;
    constructor(applications: ApplicationService, modal: ModalService);
    ngOnDestroy(): void;
    createCred(): void;
    deleteCred(cred: IAppCredentials): void;
    apiKeyInputFocus(event: FocusEvent): void;
    apiKeyInputBlur(event: FocusEvent): void;
}
