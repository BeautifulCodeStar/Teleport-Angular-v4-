
import { Component, Inject, OnInit } from "@angular/core";
import { Router }                    from "@angular/router";

import { LoginService }   from "../../../services/login.service";
import { MessageService } from "../../../services/message.service";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-logout",
    templateUrl: "logout.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalLogoutComponent implements OnInit {

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(LoginService)   private login: LoginService,
        @Inject(MessageService) private message: MessageService,
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
                    return this.router.navigateByUrl("/dashboard");
                });
        }, 1000);
    }
}
