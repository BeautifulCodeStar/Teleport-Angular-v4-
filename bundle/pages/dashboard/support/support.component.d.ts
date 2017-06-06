import { OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { AccountService } from "../../../services/account.service";
import { MessageService } from "../../../services/message.service";
import { ApplicationService } from "../../../services/application.service";
import { IApplication } from "../../../models/interfaces";
export declare class TeleportDevPortalSupportFormComponent implements OnInit {
    private http;
    account: AccountService;
    private apps;
    private messages;
    form: {
        account: string;
        app: string;
        name: string;
        email: string;
        phone: string;
        topic: string;
        priority: string;
        description: string;
    };
    Applications: IApplication[];
    isSubmitted: boolean;
    isSuccess: boolean;
    constructor(http: Http, account: AccountService, apps: ApplicationService, messages: MessageService);
    ngOnInit(): void;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
}
