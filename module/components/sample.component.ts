
import { Component, Inject } from "@angular/core";

// Import from TelePort Core.
import * as core from "shoutpoint-teleport-core";


/**
 * Sample Teleport Component
 *
 * To avoid name conflicts, prepend your selector and class name with "Teleport".
 */
@Component({
    selector: "teleport-module-sample-component",
    template: "<div>{{ data }} {{ greeting }}</div>",
})
export class TeleportSampleModuleComponent {

    public data = "I am <teleport-module-sample-component>";
    public greeting = "Waiting...";


    constructor (
        @Inject(core.services.SampleService) private sampleSrv: core.services.SampleService,
    ) {

        this.sampleSrv.ObservableIO().run().subscribe(
            result => this.greeting = result.orSome("Still waiting..."),
            // err    => console.error("TeleportSampleModuleComponent", err),
            // () => console.log("Done"),
        );
    }

}
