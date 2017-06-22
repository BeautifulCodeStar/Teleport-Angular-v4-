import { Component, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute }               from "@angular/router";

import { ApplicationService }                           from "../../../../services/application.service";
import { IWatsonPutRequest, IntegrationsWatsonService } from "../../../../services/integrations.watson.service";
import { IApplication, IWatson }                        from "../../../../models/interfaces";
import { ModalService }                                 from "../../../../services/modal.service";
import { MessageService }                               from "../../../../services/message.service";


@Component({
    moduleId   : String(module.id),
    selector    : "teleport-dev-portal-app-integrations-watson",
    templateUrl : "apps.integrations.watson.html",
    // styleUrls  : [ "../../../css/bootswatch.min.css", "../../../css/main.min.css" ],
})
export class TeleportDevPortalAppIntegrationWatsonComponent implements OnDestroy {

    public isBusy = false;
    public isEditing = false;

    public username = "";
    public password = "";

    private _application: IApplication;
    private _watson: IWatson;


    constructor (
        @Inject(ActivatedRoute)            private route: ActivatedRoute,
        @Inject(ApplicationService)        private apps: ApplicationService,
        @Inject(IntegrationsWatsonService) private watson: IntegrationsWatsonService,
        @Inject(ModalService)             private modal: ModalService,
        @Inject(MessageService)            private message: MessageService,
    ) {
        this.isBusy = true;

        this.route.params
            .filter((param: any) => !!param.appId)
            .forEach((param: any) => {

                Promise.all([
                    this.apps.getAppByName(param.appId),
                    this.watson.getTextToSpeech(param.appId),
                ])
                    .then((r: [IApplication, IWatson]) => {
                        this._application = r[0];
                        this._watson = r[1];
                        this.cancel();
                    })
                    .catch(err => {
                        this.message.error("Watson Credentials Failure", err.message, err);
                    });
            })
            .catch(err => console.error(err));
    }

    public ngOnDestroy () {
        delete this._application;
        delete this._watson;
        this.isBusy = false;
        this.isEditing = false;
        this.username = "";
        this.password = "";
    }


    public get App () {
        return this._application;
    }

    public get Watson () {
        return this._watson;
    }


    public edit () {
        this.isEditing = true;
        this.username = this._watson && this._watson.textToSpeech && this._watson.textToSpeech.username || "";
        this.password = "";
    }


    public clear () {

        this.modal.show("Delete Watson Settings", `<p>Clicking OK will delete your Watson settings.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.isBusy = true;
                    this.watson.deleteTextToSpeech(this.App.name)
                        .then((r: IWatson) => {
                            this._watson = r;
                            this.cancel();
                        })
                        .catch(err => {
                            this.cancel();
                            this.message.error("Update Failure", err.message, err);
                        });
                }
            });
    }


    public save () {

        this.isEditing = false;
        this.isBusy = true;

        const newWatson: IWatsonPutRequest = {
            textToSpeech: {
                username: this.username,
                password: this.password,
            },
        };

        this.watson.putTextToSpeech(this.App.name, newWatson)
            .then((r: IWatson) => {
                this._watson = r;
                this.cancel();
            })
            .catch(err => {
                this.cancel();
                this.message.error("Update Failure", err.message, err);
            });
    }


    public cancel () {
        this.isBusy = false;
        this.isEditing = false;
        this.username = this._watson && this._watson.textToSpeech && this._watson.textToSpeech.username || "";
        this.password = this._watson.textToSpeech.password ? "**********" : "";
    }
}
