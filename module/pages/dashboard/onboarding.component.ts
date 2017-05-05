import {Component, Input} from "@angular/core";

@Component({
    selector   : "ui-onboarding",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/dashboard.html",
})
export class UIOnboarding {

    @Input()  public userName: string;
    @Input()  public password: string;

    public errorMessage: string = "";

    constructor () {
        // Empty to keep IDE from complaining.
    }

}
