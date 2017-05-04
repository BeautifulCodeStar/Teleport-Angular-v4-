
import {Inject, Injectable}            from "@angular/core";
import {Router}                        from "@angular/router";
import {Http, Headers, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import {Observer}   from "rxjs/Observer";
import {Subject}    from "rxjs/Subject";

import {ApplicationService} from "./application.service";
// import {AccountService} from "./account.service";
import {BillingService} from "./billing.service";
import {LogsService} from "./logs.service";

interface IBotBody {
    timezoneOffset: number;
    sessionId?: string;
    query?: string;
    response?: string;
    isComplete?: boolean;
    actions?: IBotAction[];
    intent?: any;
}

interface IBotAction {
    type: "redirect" | "refresh" | "help_card";
    target: string;
    params?: any;
}

export interface IBotSubscriptionNext {
    type: "bot" | "card";
    message: string;
}


@Injectable()
export class BotService {

    private _lastResponse: IBotBody;

    private _observable: Observable<IBotSubscriptionNext>;
    private _observer: Observer<IBotSubscriptionNext>;

    constructor(
        @Inject(Router)             private router: Router,
        @Inject(Http)               private http: Http,
        // @Inject(AccountService)     private account: AccountService,
        @Inject(BillingService)     private billing: BillingService,
        @Inject(LogsService)        private logs: LogsService,
        @Inject(ApplicationService) private apps: ApplicationService
    ) {}

    /**
     * Returns Observable<string> that broadcasts regular Session state.
     * @returns {Observable<string>}
     */
    public get Observable () {

        if (! this._observable) {

            this._observable = Observable
                .create((observer: Observer<IBotSubscriptionNext>) => this._observer = observer)
                .multicast(new Subject())
                .refCount();
        }

        return this._observable;
    }


    public query (q: string, isNewSession?: boolean) {

        if (isNewSession) { this.newSession(); }

        let url = [
            API_BASE_URL,
            "bot",
        ].join("/");

        let lastRequest = (this._lastResponse || {}) as IBotBody;
        lastRequest.query = q;
        lastRequest.timezoneOffset = new Date().getTimezoneOffset();

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        this.http.post(url, JSON.stringify(lastRequest), options)
            .map  (resp => resp.json().bot as IBotBody)
            .do   ((bot: IBotBody) => {
                if (bot.isComplete) {
                    this.newSession();
                } else {
                    this._lastResponse = bot;
                }

                if (this._observer) {
                    this._observer.next({
                        type: "bot",
                        message: bot.response,
                    });
                }
            })
            .filter(bot => Array.isArray(bot.actions) && bot.actions.length > 0)
            .map (bot => bot.actions)
            .subscribe(
                actions => {
                    this.processActions(actions);
                },
                err  => {
                    console.log("bot.service.post.catch", err);
                    if (this._observer) {
                        this._observer.next({
                            type: "bot",
                            message: "Oh no! An unexpected error occurred. Your request was not completed.",
                        });
                    }
                }
            );
    }

    public newSession () {
        this._lastResponse = null;
    }

    private processActions (actions: IBotAction[]) {

        actions.forEach(action => {

            if (action.type === "help_card") {
                this._observer.next({
                    type: "card",
                    message: action.target,
                });
            } else if (action.type === "redirect") {
                this.actionRedirect(action);
            } else if (action.type === "refresh") {
                this.actionRefresh(action);
            }
        });
    }

    private actionRedirect (action: IBotAction) {

        if (action.params) {
            this.router.navigate([action.target, action.params]);
        } else {
            this.router.navigate([action.target]);
        }
    }

    private actionRefresh (action: IBotAction): any {

        switch (action.target) {
            case "applications":
                return this.apps.refreshApps;
            case "balance":
                return this.billing.refreshBalance();
            case "payments":
                return this.billing.refreshPayments(
                    new Date(action.params.from as string).getTime(),
                    new Date(action.params.to as string).getTime()
                );
            case "call_logs":
                return this.logs.loadLogs({
                    beginDate: new Date(action.params.from as string),
                    endDate: new Date(action.params.to as string),
                });
        }
    }
}
