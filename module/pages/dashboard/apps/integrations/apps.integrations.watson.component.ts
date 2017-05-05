import { Component, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute }               from "@angular/router";

import { ApplicationService }                           from "../../../../services/application.service";
import { IWatsonPutRequest, IntegrationsWatsonService } from "../../../../services/integrations.watson.service";
import { IApplication, IWatson }                        from "../../../../models/interfaces";
import { Modal }                                        from "../../../../services/modal.service";
import { MessageService }                               from "../../../../services/message.service";


@Component({
    selector    : "ui-dashboard-app-integrations-watson",
    templateUrl : DOC_BASE_HREF + "/directives/dashboard/apps/integrations/apps.integrations.watson.html",
})
export class UIAppIntegrationWatson implements OnDestroy {

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
        @Inject(Modal.Service)             private modal: Modal.Service,
        @Inject(MessageService)            private message: MessageService,
    ) {
        this.isBusy = true;

        this.route.params
            .filter((param: any) => !!param.id)
            .forEach((param: any) => {

                Promise.all([
                    this.apps.getAppByName(param.id),
                    this.watson.getTextToSpeech(param.id),
                ])
                    .then((r: [IApplication, IWatson]) => {
                        this._application = r[0];
                        this._watson = r[1];
                        this.cancel();
                    })
                    .catch(err => {
                        this.message.error("Watson Credentials Failure", err.message, err);
                    });
            });
    }

    public ngOnDestroy () {
        this._application = undefined;
        this._watson = undefined;
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
