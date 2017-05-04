import {Component, Input} from "@angular/core";

@Component({
    selector: "ui-app-user",
    templateUrl: DOC_BASE_HREF + "/directives/app-users/app.users.id.html",
})
export class UIAppUsersById {

    @Input()  public userName: string;
    @Input()  public password: string;

    public errorMessage: string = "";

    constructor () {
        // Empty to keep IDE from complaining.
    }

}
