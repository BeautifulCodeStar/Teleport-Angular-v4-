
// Remove the modules your module will not use.
import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";
import { RouterModule }            from "@angular/router";

// Modules
import { DevPortalDashboardModule } from "./dashboard/dashboard.module";

// Components
import { TeleportDevPortalForgotPasswordComponent } from "./forgot-password/forgot.component";
import { TeleportDevPortalLoginComponent } from "./login/login.component";
import { TeleportDevPortalRecoverPasswordComponent } from "./recover-password/recover.component";
import { TeleportDevPortalRegisterComponent } from "./register/register.component";

// Directives
import { directives } from "shoutpoint-teleport-core";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterModule,
        directives.PublicDirectivesModule,

        DevPortalDashboardModule,
    ],
    declarations: [
        TeleportDevPortalForgotPasswordComponent,
        TeleportDevPortalLoginComponent,
        TeleportDevPortalRecoverPasswordComponent,
        TeleportDevPortalRegisterComponent,
    ],
    exports: [
        DevPortalDashboardModule,
        TeleportDevPortalForgotPasswordComponent,
        TeleportDevPortalLoginComponent,
        TeleportDevPortalRecoverPasswordComponent,
        TeleportDevPortalRegisterComponent,
    ],
})
export class DevPortalPagesModule { }
