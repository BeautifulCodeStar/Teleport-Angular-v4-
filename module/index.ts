
import { NgModule }                from "@angular/core";
import { CommonModule }            from "@angular/common";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";

import { StoreModule } from "@ngrx/store";

import * as v1Services from "teleport-module-services/services/v1/services/index";
import * as v1Ngrx from "teleport-module-services/services/v1/ngrx/index";

// Components

// Modules
import { DevPortalComponentsModule } from "./components/components.module";
import { DevPortalPagesModule }      from "./pages/pages.module";
import { DevPortalServicesModule }   from "./services/services.module";

// Services

// Models, functions and classes
import * as devPortalUtils    from "./utils/index";
import * as devPortalModels   from "./models/index";
import * as devPortalServices from "./services/index";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,

        v1Services.APIv1ServicesModule,
        StoreModule.forRoot(v1Ngrx.getReducers()),

        DevPortalComponentsModule,
        DevPortalPagesModule,
        DevPortalServicesModule.forRoot(),
    ],
    exports: [
        DevPortalComponentsModule,
        DevPortalPagesModule,
        DevPortalServicesModule,
    ],
})
export class DevPortalModule { }


/**
 * Export models, classes and functions from DevPortal lib.
 */

export { devPortalUtils };
export { devPortalModels };
export { devPortalServices };
