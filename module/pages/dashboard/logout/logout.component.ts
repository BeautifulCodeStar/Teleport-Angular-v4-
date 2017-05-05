
import { Component, Inject } from "@angular/core";
import { Router }            from "@angular/router";

import { LoginService }   from "../../../services/login.service";
import { MessageService } from "../../../services/message.service";


@Component({
    selector   : "ui-logout",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/logout/logout.html",
})
export class UILogout {

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(LoginService)   private login: LoginService,
        @Inject(MessageService) private message: MessageService
    ) {}

    public ngOnInit () {

        setTimeout(() => {
            this.login.logout()
                .then(() => {
                    console.log("Logout Success");
                })
                .catch((err: any) => {
                    console.log("Error on checkout: ", err.stack);
                    this.message.error("Oops! Logout Failure.", "An error prevented log out. Try again.", err);
                    this.router.navigateByUrl("/dashboard");
                });
        }, 1000);
    }
}
