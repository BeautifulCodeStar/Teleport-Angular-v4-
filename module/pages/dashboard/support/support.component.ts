import { Component, Inject, OnInit }     from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { AccountService }     from "../../../services/account.service";
import { MessageService }     from "../../../services/message.service";
import { ApplicationService } from "../../../services/application.service";
import { IApplication }       from "../../../models/interfaces";

import { EmailValidator } from "../../../utils/EmailValidator";

declare const API_BASE_URL: string;


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-support-form",
    templateUrl: "support.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalSupportFormComponent implements OnInit {

    public form = {
        account: "",
        app: "N/A",
        name: "",
        email: "",
        phone: "",
        topic: "bug_report",
        priority: "normal",
        description: "",
    };

    public Applications: IApplication[] = [];
    
    public isSubmitted = false;
    public isSuccess = false;

    
    constructor (
        @Inject(Http)               private http: Http,
        @Inject(AccountService)     public account: AccountService,
        @Inject(ApplicationService) private apps: ApplicationService,
        @Inject(MessageService)     private messages: MessageService,
    ) {}

    public ngOnInit () {

        this.isSubmitted = false;
        this.isSuccess = false;

        this.account.Observable
            .first(a => !!a)
            .subscribe(a => {
                this.form.account = a.id;
                this.form.name = `${a.firstName} ${a.lastName}`;
                this.form.email = a.email;
                this.form.phone = a.phone || "";
            });

        this.apps.Observable
            .first(a => !!a)
            .subscribe(a => {
                this.Applications = a;
            });
    }

    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }

    public onSubmit () {

        this.isSubmitted = true;

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        this.http
            .post(`${API_BASE_URL}/support`, JSON.stringify(this.form), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .toPromise()
            .then(() => {
                this.isSuccess = true;
                this.isSubmitted = false;
                this.form = {
                    account: "",
                    app: "N/A",
                    name: "",
                    email: "",
                    phone: "",
                    topic: "bug_report",
                    priority: "normal",
                    description: "",
                };
                this.messages.info("Support Request Delivered", "We will respond as soon as possible.");
            })
            .catch(err => {
                this.isSuccess = false;
                this.isSubmitted = false;
                this.messages.error("Registration Failed", err.message, err);
            });
    }
}
