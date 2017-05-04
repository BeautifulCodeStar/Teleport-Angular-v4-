
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot }  from "@angular/router";
import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { SessionService }        from "../../services/session.service";
import { ApplicationService }    from "../../services/application.service";
import { PermsGuardCanActivate } from "../../services/perms-guard.service";

import { UIDashboard }            from "./dashboard.component";
import { UISupportForm }          from "./support/support.component";
import { UIDataLogs }             from "./data/data.logs.component";
import { UIDataUsage }            from "./data/data.usage.component";
import { UIAppById }              from "./apps/apps.id.component";
import { UIAppsCreate }           from "./apps/apps-create.component";
import { UIApps }                 from "./apps/apps.component";
import { UIAppIntegrationAws }    from "./apps/integrations/apps.integrations.aws.component";
import { UIAppIntegrationWatson } from "./apps/integrations/apps.integrations.watson.component";
import { UIBillingSettings }      from "./billing/billing.settings.component";
import { UIBillingPayment }       from "./billing/billing.payment.component";
import { UIBilling }              from "./billing/billing.component";
import { UIProfileAlertsCreate }  from "./profile/profile.alerts.create.component";
import { UIProfileAlerts }        from "./profile/profile.alerts.component";
import { UIProfile }              from "./profile/profile.component";
import { UIUserProfile }          from "./profile/profile.user.component";
import { UIProfileBasicAuth }     from "./profile/profile.basic-auth.component";
import { UILogout }               from "./logout/logout.component";
import { UIUsers }                from "./profile/users/users.component";
import { UIUserUpdate }           from "./profile/users/user.update.component";
import { UIUserCreate }           from "./profile/users/user.create.component";
import { UIAccessDenied }         from "./access-denied/access.component";



@Injectable()
export class CanActivateDashboard implements CanActivate {

    constructor (
        @Inject(SessionService) private session: SessionService,
    ) {}

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.session.Observable.skipWhile(s => ! s).map(s => !! s).take(1);
    }
}


@Injectable()
export class CanActivateApplications implements CanActivate {

    constructor (
        @Inject(ApplicationService) private apps: ApplicationService,
    ) {}

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.apps.Observable.skipWhile(a => ! a).map(a => !! a).take(1);
    }
}


const dashboardPageRoutes: Routes = [
    {
        path             : "dashboard",
        component        : UIDashboard,
        canActivate      : [ CanActivateDashboard ],
        canActivateChild : [ PermsGuardCanActivate ],
        children: [
            { path: "",                          redirectTo: "/dashboard/applications", pathMatch: "full" },

            { path: "account",                   component: UIProfile,             data: { perms: [ "account.me.read" ] } },
            { path: "account/user",              component: UIUserProfile,         data: { perms: [ "account.me.read" ] } },
            { path: "account/alerts",            component: UIProfileAlerts,       data: { perms: [ "account.alerts.read" ] } },
            { path: "account/alerts/create",     component: UIProfileAlertsCreate, data: { perms: [ "account.alerts.read", "account.alerts.create" ] } },
            { path: "account/credentials",       component: UIProfileBasicAuth,    data: { perms: [ "account.credentials.read" ] } },
            { path: "account/payments",          component: UIBilling,             data: { perms: [ "account.billing.payments.read" ] } },
            { path: "account/payments/submit",   component: UIBillingPayment,      data: { perms: [ "account.billing.payments.read", "account.billing.payments.create" ] } },
            { path: "account/payments/settings", component: UIBillingSettings,     data: { perms: [ "account.billing.payments.read" ] } },

            { path: "account/users",             component: UIUsers,               data: { perms: [ "account.users.read" ] } },
            { path: "account/users/create",      component: UIUserCreate,          data: { perms: [ "account.users.create" ] } },
            { path: "account/users/:userId",     component: UIUserUpdate,          data: { perms: [ "account.users.update", "account.users.delete" ] } },

            { path: "applications",                         component: UIApps,     data: { perms: [ "account.applications.app.read" ] } },
            { path: "applications/create",                  component: UIAppsCreate,           canActivate: [ CanActivateApplications ], data: { perms: [ "account.applications.app.read", "account.applications.app.create" ] } },
            { path: "applications/:id",                     component: UIAppById,              canActivate: [ CanActivateApplications ], data: { perms: [ "account.applications.app.read" ] } },
            { path: "applications/:id/integrations/aws",    component: UIAppIntegrationAws,    canActivate: [ CanActivateApplications ], data: { perms: [ "account.applications.app.read", "account.applications.app.update" ] } },
            { path: "applications/:id/integrations/watson", component: UIAppIntegrationWatson, canActivate: [ CanActivateApplications ], data: { perms: [ "account.applications.app.read", "account.applications.app.update" ] } },

            { path: "logs",                      component: UIDataLogs,            data: { perms: [ "account.logs.read" ] } },
            { path: "usage",                     component: UIDataUsage,           data: { perms: [ "account.usage.read" ] } },

            { path: "support",                   component: UISupportForm },
            { path: "logout",                    component: UILogout      },

            { path: "access-denied",             component: UIAccessDenied },
        ],
    },
];


export const dashboardPageRoutingProviders: any[] = [
    CanActivateDashboard,
    CanActivateApplications,
    PermsGuardCanActivate,
];


export const dashboardRouting = RouterModule.forChild(dashboardPageRoutes);
