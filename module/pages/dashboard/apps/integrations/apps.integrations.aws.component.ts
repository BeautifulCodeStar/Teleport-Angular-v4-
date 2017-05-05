import { Component, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute }               from "@angular/router";

import { ApplicationService }                     from "../../../../services/application.service";
import { IAWSPutRequest, IntegrationsAWSService } from "../../../../services/integrations.aws.service";
import { IApplication, IAWS }                     from "../../../../models/interfaces";
import { Modal }                                  from "../../../../services/modal.service";
import { MessageService }                         from "../../../../services/message.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-app-integrations-aws",
    templateUrl: "apps.integrations.aws.html",
    styleUrls  : [ "../../../css/bootswatch.css", "../../../css/main.min.css" ],
})
export class TeleportDevPortalAppIntegrationAwsComponent implements OnDestroy {

    public isBusy = false;
    public isEditing = false;

    public accessKey = "";
    public securityKey = "";
    public bucket = "";
    public region = "";

    private _application: IApplication;
    private _aws: IAWS;


    constructor (
        @Inject(ActivatedRoute)         private route: ActivatedRoute,
        @Inject(ApplicationService)     private apps: ApplicationService,
        @Inject(IntegrationsAWSService) private aws: IntegrationsAWSService,
        @Inject(Modal.Service)          private modal: Modal.Service,
        @Inject(MessageService)         private message: MessageService,
    ) {
        this.isBusy = true;

        this.route.params
            .filter((param: any) => !!param.id)
            .forEach((param: any) => {

                Promise.all([
                    this.apps.getAppByName(param.id),
                    this.aws.getAWS(param.id),
                ])
                .then((r: [IApplication, IAWS]) => {
                    this._application = r[0];
                    this._aws = r[1];
                    this.cancel();
                })
                .catch(err => {
                    this.message.error("AWS Credentials Failure", err.message, err);
                });
            })
            .catch(err => console.error(err));
    }

    public ngOnDestroy () {
        delete this._application;
        delete this._aws;
        this.isBusy = false;
        this.isEditing = false;
        this.accessKey = "";
        this.securityKey = "";
        this.bucket = "";
        this.region = "";
    }


    public get App () {
        return this._application;
    }

    public get AWS () {
        return this._aws;
    }


    public edit () {
        this.isEditing = true;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    }


    public clear () {

        this.modal.show("Delete AWS Settings", `<p>Clicking OK will delete your AWS settings.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.isBusy = true;
                    this.aws.deleteAWS(this.App.name)
                        .then((r: IAWS) => {
                            this._aws = r;
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

        const newAWS: IAWSPutRequest = {
            accessKey  : this.accessKey,
            securityKey: this.securityKey,
            s3: {
                bucket: this.bucket,
                region: this.region,
            },
        };

        this.aws.putAWS(this.App.name, newAWS)
            .then((r: IAWS) => {
                this._aws = r;
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
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = this._aws.securityKey ? "**********" : "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    }
}
