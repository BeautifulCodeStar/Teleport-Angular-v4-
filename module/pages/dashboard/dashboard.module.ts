import { NgModule } from "@angular/core";

import { RolePickerModule }    from "./profile/users/role-picker.module";
import { Md2DatepickerModule } from "../../md2/datepicker/datepicker";

import { dashboardRouting, dashboardPageRoutingProviders } from "./dashboard.routing";
import { SharedModule }                                    from "../../shared.module";

import { AlertsService }             from "../../services/alerts.service";
// import { BotService }                from "../../services/bot.service";
import { SessionService }            from "../../services/session.service";
import { AccountService }            from "../../services/account.service";
import { AccountCredentialsService } from "../../services/account.credentials.service";
import { LogsService }               from "../../services/logs.service";
import { UsageService }              from "../../services/usage.service";
import { ApplicationService }        from "../../services/application.service";
import { IntegrationsAWSService }    from "../../services/integrations.aws.service";
import { IntegrationsWatsonService } from "../../services/integrations.watson.service";
import { BillingService }            from "../../services/billing.service";
import { TopUpService }              from "../../services/top-up.service";
import { UserService }               from "../../services/user.service";

// import { UIBot }              from "./bot/bot.component";
import { UIDashboardSideNav }                       from "./sid-nav.component";
import { UIAppCredentials }                         from "./apps/apps.credentials.component";
import { UIProfilePassword, UIUserProfilePassword } from "./profile/profile.password.component";
import { UIProfileBasicAuth }                       from "./profile/profile.basic-auth.component";

import { UIDashboard }           from "./dashboard.component";
import { UISupportForm }         from "./support/support.component";
import { UIDataLogs }            from "./data/data.logs.component";
import { UIDataUsage }           from "./data/data.usage.component";
import { UIAppById }             from "./apps/apps.id.component";
import { UIAppsCreate }          from "./apps/apps-create.component";
import { UIApps }                from "./apps/apps.component";
import { UIAppIntegrationAws }   from "./apps/integrations/apps.integrations.aws.component";
import { UIAppIntegrationWatson} from "./apps/integrations/apps.integrations.watson.component";
import { UIBillingSettings }     from "./billing/billing.settings.component";
import { UIBillingPayment }      from "./billing/billing.payment.component";
import { UIBilling }             from "./billing/billing.component";
import { UITopUp }               from "./top-up/top-up.component";
import { UIProfileAlertsCreate } from "./profile/profile.alerts.create.component";
import { UIProfileAlerts }       from "./profile/profile.alerts.component";
import { UIProfile }             from "./profile/profile.component";
import { UIUserProfile }         from "./profile/profile.user.component";
import { UILogout }              from "./logout/logout.component";
import { UIUsers }               from "./profile/users/users.component";
import { UIUserCreate }          from "./profile/users/user.create.component";
import { UIUserUpdate }          from "./profile/users/user.update.component";
import { UIAccessDenied }        from "./access-denied/access.component";

import { AllowAccessDirective } from "./access-denied/access.directive";


/**
 * Module for after user login.
 */
@NgModule({
    imports: [
        dashboardRouting,
        SharedModule,
        RolePickerModule,
        Md2DatepickerModule.forRoot(),
    ],
    declarations: [
        AllowAccessDirective,
        UIDashboardSideNav,
        UIAppCredentials,
        UIProfilePassword,
        UIUserProfilePassword,
        // UIBot,
        UIDashboard,
        UIProfile,
        UIUserProfile,
        UIProfileBasicAuth,
        UIProfileAlerts,
        UIProfileAlertsCreate,
        UIBilling,
        UIBillingPayment,
        UIBillingSettings,
        UITopUp,
        UIApps,
        UIAppsCreate,
        UIAppById,
        UIAppIntegrationAws,
        UIAppIntegrationWatson,
        UIDataLogs,
        UIDataUsage,
        UISupportForm,
        UILogout,
        UIUsers,
        UIUserCreate,
        UIUserUpdate,
        UIAccessDenied,
    ],
    providers: [
        AlertsService,
        // BotService,
        SessionService,
        AccountService,
        AccountCredentialsService,
        ApplicationService,
        IntegrationsAWSService,
        IntegrationsWatsonService,
        BillingService,
        LogsService,
        UsageService,
        TopUpService,
        UserService,
        dashboardPageRoutingProviders,
    ],
})

export class DashboardModule {}
