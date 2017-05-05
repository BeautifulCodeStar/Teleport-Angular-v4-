import { OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicationService } from "../../../services/application.service";
import { IApplication } from "../../../models/interfaces";
import { Modal } from "../../../services/modal.service";
export declare class TeleportDevPortalAppByIdComponent implements OnDestroy {
    private router;
    private apps;
    private modal;
    private route;
    isBusy: boolean;
    isEditing: boolean;
    appName: string;
    appNotes: string;
    private _application;
    constructor(router: Router, apps: ApplicationService, modal: Modal.Service, route: ActivatedRoute);
    ngOnDestroy(): void;
    readonly App: IApplication;
    editApp(): void;
    deleteApp(): void;
    saveChanges(): void;
    cancelChanges(): void;
}
