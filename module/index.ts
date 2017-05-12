
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

        DevPortalComponentsModule,
        DevPortalPagesModule,
        DevPortalServicesModule,
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
// export const devPortalUtils = devPortalUtilsImport;
// export const devPortalModels = devPortalModelsImport;
// export const devPortalServices = devPortalServicesImport;
export { devPortalUtils };
export { devPortalModels };
export { devPortalServices };

// export namespace devPortalServices {
//
//     export { devPortalServicesImport.SessionService };
//
// }
//
// const s = devPortalServices.SessionService;
