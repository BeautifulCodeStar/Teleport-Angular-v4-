
import { NgModule, enableProdMode } from "@angular/core";
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";

import { routing }         from "./app.routing";
import { SharedModule }    from "./shared.module";
import { DashboardModule } from "./directives/dashboard/dashboard.module";

import { AppComponent }      from "./app.component";
import { UIHome }            from "./directives/home/home.component";
import { UILogin }           from "./directives/login/login.component";
import { UIRegister }        from "./directives/register/register.component";
import { UIForgotPassword }  from "./directives/forgot-password/forgot.component";
import { UIRecoverPassword } from "./directives/recover-password/recover.component";


if (! IS_DEV_MODE) {
    enableProdMode();
}

/**
 * Module for guest pages.
 */
@NgModule({
    imports: [
        routing,
        DashboardModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        UIHome,
        UILogin,
        UIRegister,
        UIForgotPassword,
        UIRecoverPassword,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
