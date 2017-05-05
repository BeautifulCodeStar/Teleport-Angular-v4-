import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../../services/login.service";
import { MessageService } from "../../../services/message.service";
export declare class TeleportDevPortalLogoutComponent implements OnInit {
    private router;
    private login;
    private message;
    constructor(router: Router, login: LoginService, message: MessageService);
    ngOnInit(): void;
}
