
// Remove the modules your module will not use.
import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";
import { RouterModule }            from "@angular/router";

// Third-party libs.
import { MaterialModule } from "@angular/material";

// Modules
// import { moduleRouting } from "./module.routing";

// Components
import { TeleportLoginPageComponent } from "./login/login.component";

import { directives } from "shoutpoint-teleport-core";


@NgModule({
    // Remove the modules your module will not use.
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterModule,
        // moduleRouting,
        MaterialModule,
        directives.PublicDirectivesModule,
    ],
    declarations: [
        TeleportLoginPageComponent,
    ],
    // Any services that are used in this module.
    providers: [

    ],
    // Export any Components you'd like to expose to an importing app.
    // You'll likely want to choose unique names to avoid conflicts.
    exports: [
        // BrowserModule,
        // FormsModule,
        // HttpModule,
        RouterModule,
    ],
})
export class DevPortalPagesModule { }
