import { OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from "../../../../services/application.service";
import { IntegrationsWatsonService } from "../../../../services/integrations.watson.service";
import { IApplication, IWatson } from "../../../../models/interfaces";
import { ModalService } from "../../../../services/modal.service";
import { MessageService } from "../../../../services/message.service";
export declare class TeleportDevPortalAppIntegrationWatsonComponent implements OnDestroy {
    private route;
    private apps;
    private watson;
    private modal;
    private message;
    isBusy: boolean;
    isEditing: boolean;
    username: string;
    password: string;
    private _application;
    private _watson;
    constructor(route: ActivatedRoute, apps: ApplicationService, watson: IntegrationsWatsonService, modal: ModalService, message: MessageService);
    ngOnDestroy(): void;
    readonly App: IApplication;
    readonly Watson: IWatson;
    edit(): void;
    clear(): void;
    save(): void;
    cancel(): void;
}
