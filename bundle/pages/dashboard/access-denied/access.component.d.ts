import { OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "../../../services/session.service";
export declare class TeleportDevPortalAccessDeniedComponent implements OnInit, OnDestroy {
    private session;
    private route;
    private _reqPerms;
    private _devPerms;
    constructor(session: SessionService, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly RequiredPermissions: string[];
    hasPermission(perm: string): boolean;
}
