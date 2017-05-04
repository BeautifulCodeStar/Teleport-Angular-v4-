import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import { Subscription }      from "rxjs/Subscription";


@Component({
    selector   : "ui-dashboard-sidenav",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/side-nav.html",
})
export class UIDashboardSideNav {

    private _routerSubscription: Subscription;

    private _currentLinkUrl: string;
    private _params: { [id: string]: string } = {};

    constructor (
        @Inject(Router) private router: Router,
    ) {}

    public ngOnInit() {
        // Watch router changes. Enforce credential restrictions. Check for inactivity.
        this._routerSubscription = <Subscription> this.router.events.subscribe(r => this.onRouteUpdate(this.router.url));
     }

    public ngOnDestroy() {
        if (this._routerSubscription) { this._routerSubscription.unsubscribe(); }
    }

    public routeIs (url: string) {
        return this.router.url === url;
    }

    public routeStartsWith (prefix: string) {
        return this.router.url.startsWith(prefix);
    }

    public routeMatches (routeRegEx: string) {
        return new RegExp(routeRegEx).test(this._currentLinkUrl);
    }

    public get params () {
        return this._params;
    }

    private onRouteUpdate (linkUrl: string) {
        this._currentLinkUrl = linkUrl;
        // Can't seem to easily get this component aware of the app routes.
        if (APP_REGEX.test(linkUrl)) {
            this._params.appId = linkUrl.match(APP_REGEX)[1];
        }
    }
}

const APP_REGEX = /^\/dashboard\/applications\/([^\/]+)/;
