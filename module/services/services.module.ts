
import { NgModule }      from "@angular/core";

import { LoginService }              from "./login.service";
import { MessageService }            from "./message.service";
import { Modal }                     from "./modal.service";
import { AccountCredentialsService } from "./account.credentials.service";
import { AccountService }            from "./account.service";
import { AlertsService }             from "./alerts.service";
import { ApplicationService }        from "./application.service";
import { BillingService }            from "./billing.service";
import { IntegrationsAWSService }    from "./integrations.aws.service";
import { IntegrationsWatsonService } from "./integrations.watson.service";
import { LogsService }               from "./logs.service";
import { PermsGuardCanActivate }     from "./perms-guard.service";
import { SessionService }            from "./session.service";
import { TopUpService }              from "./top-up.service";
import { UsageService }              from "./usage.service";
import { UserService }               from "./user.service";


/**
 * Exposes DevPortalModule to importing app.
 */
@NgModule({
    providers: [
        AccountCredentialsService,
        AccountService,
        AlertsService,
        ApplicationService,
        BillingService,
        IntegrationsAWSService,
        IntegrationsWatsonService,
        LoginService,
        LogsService,
        MessageService,
        Modal.Service,
        PermsGuardCanActivate,
        SessionService,
        TopUpService,
        UsageService,
        UserService,
    ],
    exports: [
        // AccountCredentialsService,
        // AccountService,
        // AlertsService,
        // ApplicationService,
        // BillingService,
        // IntegrationsAWSService,
        // IntegrationsWatsonService,
        // LoginService,
        // LogsService,
        // MessageService,
        // Modal.Service,
        // PermsGuardCanActivate,
        // SessionService,
        // TopUpService,
        // UsageService,
        // UserService,
    ],
})
export class DevPortalServicesModule {}
