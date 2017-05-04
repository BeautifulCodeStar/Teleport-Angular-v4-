
import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MyModuleMainPageComponent } from "./main/main-page.component";

/**
 * It seems that you will need to know the parent path of where this module
 * will live. If unsure, ask the core app product manager.
 */
const routes: Routes = [{
        path      : "module-page",
        component : MyModuleMainPageComponent,
    }];

// export const appRoutingProviders: any[] = [];

export const moduleRouting = RouterModule.forChild(routes) as ModuleWithProviders;
