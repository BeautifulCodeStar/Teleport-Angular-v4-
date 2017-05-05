import {Component, Input} from "@angular/core";

@Component({
    selector: "ui-app-users",
    templateUrl: DOC_BASE_HREF + "/directives/app-users/app.users.html",
})
export class UIAppUsers {

    @Input()  public userName: string;
    @Input()  public password: string;

    public errorMessage: string = "";

    constructor () {
        // Empty to keep IDE from complaining.
    }

}
