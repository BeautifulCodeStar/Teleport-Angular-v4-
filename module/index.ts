
// Remove the modules your module will not use.
import { NgModule }      from "@angular/core";
import { CommonModule }  from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule }     from "@angular/platform-browser/animations";
import { FormsModule }   from "@angular/forms";
import { HttpModule }    from "@angular/http";
import { RouterModule }  from "@angular/router";

// Components
import { MyModuleNameComponent }         from "./module.component";
import { TeleportSampleModuleComponent } from "./components/sample.component";

// Modules
import { PagesModule } from "./pages/pages.module";

// Directives
import { TeleportSampleDirective } from "./directives/sample.directive";

// Services
import { TeleportSampleService } from "./services/sample.service";
import { services } from "shoutpoint-teleport-core";


@NgModule({
    // Remove the modules your module will not use.
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        PagesModule,
        services.ServicesModule,
    ],
    declarations: [
        MyModuleNameComponent,
        TeleportSampleModuleComponent,
        TeleportSampleDirective,
    ],
    // Any services that are used in this module.
    // Services will likely be isolated to a module. If not, lobby to move into core.
    providers: [
        TeleportSampleService,
    ],
    // Export any Components you'd like to expose to an importing app.
    // You'll likely want to choose unique names to avoid conflicts.
    exports: [
        MyModuleNameComponent,
        TeleportSampleDirective,
    ],
})
// Change this class name to match your module's package name. Pascal case. Ends with "Module".
export class MyModuleNameModule { }
