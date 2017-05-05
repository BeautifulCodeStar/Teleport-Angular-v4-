import { ActivatedRouteSnapshot, CanActivateChild, Router } from "@angular/router";
import { AccountService } from "./account.service";
export declare class PermsGuardCanActivate implements CanActivateChild {
    private account;
    private router;
    constructor(account: AccountService, router: Router);
    canActivateChild(route: ActivatedRouteSnapshot): Promise<{}>;
}
