import { OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicationService } from "../../../services/application.service";
import { IApplication } from "../../../models/interfaces";
import { ModalService } from "../../../services/modal.service";
export declare class TeleportDevPortalAppByIdComponent implements OnInit, OnDestroy {
    private router;
    private apps;
    private modal;
    private route;
    isBusy: boolean;
    isEditing: boolean;
    appName: string;
    appNotes: string;
    private _application;
    constructor(router: Router, apps: ApplicationService, modal: ModalService, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly App: IApplication;
    editApp(): void;
    deleteApp(): void;
    saveChanges(): void;
    cancelChanges(): void;
}
