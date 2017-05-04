import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router }                               from "@angular/router";

import { Subscription } from "rxjs/Subscription";

import { ISession }                        from "../../models/interfaces";
import { SessionService }                  from "../../services/session.service";
import { AccountService }                  from "../../services/account.service";
import { ApplicationService }              from "../../services/application.service";
import { BillingService, IBillingPayload } from "../../services/billing.service";
import { MessageService }                  from "../../services/message.service";



@Component({
    selector   : "ui-dashboard",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/dashboard.html",
})
export class UIDashboard implements OnInit, OnDestroy {

    public Session: ISession;
    public accountId: string = "";
    public balance: number = undefined;

    public isSideNavOpen = false;
    public isDevBotOpen = false;

    private _sessionSubscription: Subscription;
    private _billingSubscription: Subscription;
    private _routerSubscription: Subscription;

    private _inactivityCounter = 0;

    constructor (
        @Inject(Router)             private router: Router,
        @Inject(SessionService)     private sessions: SessionService,
        @Inject(AccountService)     private account: AccountService,
        @Inject(ApplicationService) private apps: ApplicationService,
        @Inject(BillingService)     private billing: BillingService,
        @Inject(MessageService)     private messages: MessageService,
    ) {}

    public ngOnInit () {

        document.body.className = "Dashboard";

        this._inactivityCounter = 0;

        // Watch router changes. Enforce credential restrictions. Check for inactivity.
        this._routerSubscription = <Subscription> this.router.events.subscribe(
            () => {
                this.isSideNavOpen = false;
                this._inactivityCounter = 0;
                if (this.Session === null) { this.onEndSession(); }
            }
        );

        this._sessionSubscription = this.sessions.Observable
            // .do(s => console.log("HI!", s))
            .takeWhile(() => this._inactivityCounter++ < 10)
            .subscribe(
                (session: ISession) => {
                    if (session === null) { this.onEndSession(); }
                    this.Session = session;
                    this.accountId = session.developer.portalUser ? session.developer.portalUser.developerId : session.developer.id;
                },
                (err: Error) => {
                    console.error("app.component", err);
                    this.onEndSession();
                },
                () => {
                    console.error("Inactive User. Alert for reload.");
                    this.messages.warning("Forced Logout", "You were logged out due to inactivity.");
                    this.router.navigateByUrl("/dashboard/logout");
                }
            );

        this._billingSubscription = this.billing.Observable
            .filter(b => b.balance !== undefined)
            .subscribe((b: IBillingPayload) => this.balance = b.balance);
    }

    public ngOnDestroy () {

        document.body.className = "no-nav";

        if (this._sessionSubscription) { this._sessionSubscription.unsubscribe(); }
        if (this._billingSubscription) { this._billingSubscription.unsubscribe(); }
        if (this._routerSubscription) { this._routerSubscription.unsubscribe(); }
        this.sessions.cleanup();
        this.account.cleanup();
        this.apps.cleanup();
        this.billing.cleanup();
    }

    public logout (): void {
        this.router.navigateByUrl("/dashboard/logout");
    }

    private onEndSession () {
        if (this.Session !== null) {
            this.Session = null;
        }
    }
}
