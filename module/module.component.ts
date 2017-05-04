
import { Component } from "@angular/core";

/**
 * This it the entry point of your component. The "selector" value is how the core app
 * will add this module to its page(s). Set this selector to match you package name
 * with the following naming convention: "teleport-module-my-module-name".
 */
@Component({
    selector: "teleport-module-my-module-name",
    template: "<h3>teleport-module-my-module-name</h3><router-outlet></router-outlet><teleport-module-sample-component></teleport-module-sample-component>",
})
/**
 * Set the class name to reflect the selector value, minus the "teleport-module-" prefix.
 */
export class MyModuleNameComponent { }
