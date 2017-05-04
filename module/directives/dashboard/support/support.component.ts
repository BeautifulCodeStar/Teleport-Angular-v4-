import { Component, Inject }             from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";

import { AccountService }     from "../../../services/account.service";
import { MessageService }     from "../../../services/message.service";
import { ApplicationService } from "../../../services/application.service";
import { IApplication }       from "../../../models/interfaces";

import {EmailValidator} from "../../../utils/EmailValidator";


@Component({
    selector   : "ui-support-form",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/support/support.html",
})
export class UISupportForm {

    public form = {
        account: "",
        app: "N/A",
        name: "",
        email: "",
        phone: "",
        topic: "bug_report",
        priority: "normal",
        description: "",
        "g-recaptcha-response": "",
    };

    public Applications: IApplication[] = [];
    
    public isSubmitted = false;
    public isSuccess = false;
    public isCaptchaOk = false;

    private _resetCaptchaObservable: Observable<boolean>;
    private _resetCaptchaObserver: Observer<boolean>;

    
    constructor (
        @Inject(Http)               private http: Http,
        @Inject(AccountService)     private account: AccountService,
        @Inject(ApplicationService) private apps: ApplicationService,
        @Inject(MessageService)     private messages: MessageService,
    ) {
        this._resetCaptchaObservable = Observable.create((observer: Observer<boolean>) => this._resetCaptchaObserver = observer);
    }

    public ngOnInit () {

        this.isSubmitted = false;
        this.isSuccess = false;
        this.isCaptchaOk = false;

        this.account.Observable
            .first(a => !!a)
            .subscribe(a => {
                this.form.account = a.id;
                this.form.name = `${a.firstName} ${a.lastName}`;
                this.form.email = a.email;
                this.form.phone = a.phone;
            });

        this.apps.Observable
            .first(a => !!a)
            .subscribe(a => {
                this.Applications = a;
            });
    }

    public ngOnDestroy () {
        if (this._resetCaptchaObserver) {
            this._resetCaptchaObserver.complete();
        }
    }

    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }
    
    public onCaptcha (token: string, val: boolean) {
        this.form["g-recaptcha-response"] = token;
        this.isCaptchaOk = val;
    }

    public resetCaptchaObservable (): Observable<boolean> {
        return this._resetCaptchaObservable;
    }
    
    public onSubmit () {

        this.isSubmitted = true;

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        this.http
            .post(`${API_BASE_URL}/support`, JSON.stringify(this.form), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .toPromise()
            .then(() => {
                this.isSuccess = true;
                this.isSubmitted = false;
                this._resetCaptchaObserver.next(true);
                this.form = {
                    account: "",
                    app: "N/A",
                    name: "",
                    email: "",
                    phone: "",
                    topic: "bug_report",
                    priority: "normal",
                    description: "",
                    "g-recaptcha-response": "",
                };
                this.messages.info("Support Request Delivered", "We will respond as soon as possible.");
            })
            .catch(err => {
                this.isSuccess = false;
                this.isSubmitted = false;
                this._resetCaptchaObserver.next(true);
                this.messages.error("Registration Failed", err.message, err);
            });
    }
}
