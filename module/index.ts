
import { NgModule }                from "@angular/core";
import { CommonModule }            from "@angular/common";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";

// Components

// Modules
import { DevPortalComponentsModule } from "./components/components.module";
import { DevPortalPagesModule }      from "./pages/pages.module";
import { DevPortalServicesModule }   from "./services/services.module";

// Services
import { services } from "shoutpoint-teleport-core";

// Models, functions and classes
import * as devPortalUtilsImport from "./utils/index";
import * as devPortalModelsImport from "./models/index";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,

        DevPortalComponentsModule,
        DevPortalPagesModule,
        DevPortalServicesModule,

        services.ServicesModule,
    ],
    exports: [
        DevPortalComponentsModule,
        DevPortalPagesModule,
        DevPortalServicesModule,
    ],
})
// Change this class name to match your module's package name. Pascal case. Ends with "Module".
export class DevPortalModule { }


/**
 * Export models, classes and functions from DevPortal lib.
 */
export const devPortalUtils = devPortalUtilsImport;
export const devPortalModels = devPortalModelsImport;
