
import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute }                       from "@angular/router";

import { IUserPermissions } from "../../../models/interfaces";

import { SessionService } from "../../../services/session.service";

import { validate } from "../../../utils/Permissions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-access-denied",
    templateUrl: "access.html",
    styleUrls  : [ "../../css/bootswatch.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalAccessDeniedComponent implements OnInit, OnDestroy {

    private _reqPerms: string[] = [];
    private _devPerms: IUserPermissions = {};

    constructor (
        @Inject(SessionService) private session: SessionService,
        @Inject(ActivatedRoute) private route: ActivatedRoute,
    ) {}


    public ngOnInit () {

        this._reqPerms = ((this.route.snapshot.queryParams as any).perms || "").split("|");
        // console.log("this.route.snapshot.params =>", (this.route.snapshot.queryParams as any).perms);

        this.session.Observable
            .skipWhile(s => ! s)
            .take(1)
            .subscribe(s => { if ( s !== null) { this._devPerms = s.developer.permissions; } });
    }


    public ngOnDestroy () {
        this._reqPerms = [];
        this._devPerms = {};
    }


    public get RequiredPermissions (): string[] {
        return this._reqPerms;
    }


    public hasPermission (perm: string) {
        return validate (this._devPerms, { [perm]: true });
    }
}
