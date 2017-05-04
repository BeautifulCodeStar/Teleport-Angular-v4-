
import { Component, ModuleWithProviders, Inject } from "@angular/core";
import { Routes, RouterModule, Router }           from "@angular/router";


/**
 * This component embeds your component on the page with its selector.
 * The selector is set under /module/module.component.ts.
 */
@Component({
  selector: 'demo-app',
  template: `<h1>Module Demo Page</h1><teleport-module-my-module-name></teleport-module-my-module-name>`,
})
export class AppComponent  {

    constructor(
        @Inject(Router) router: Router,
    ) {
        router.events.subscribe(e => console.log("AppComponentWithRouting =>", e));
    }
}

const routes: Routes = [{
        path       : "demo",
        redirectTo : "/module-page",
        pathMatch  : "full"
    }];

// export const appRoutingProviders: any[] = [];

export const appRouting = RouterModule.forRoot(routes) as ModuleWithProviders;
