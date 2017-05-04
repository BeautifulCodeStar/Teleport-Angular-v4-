import {
    Component, Inject, OnInit, OnDestroy, ViewChild,
    ElementRef, EventEmitter, Input, Output,
} from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { BotService, IBotSubscriptionNext } from "../../../services/bot.service";

interface IBotHistory {
    type: "user" | "bot" | "card";
    ts: Date;
    from: string;
    message: string | HTMLElement;
}

const BOT_NAME = "DevBot";

@Component({
    selector   : "ui-bot",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/bot/bot.html",
})
export class UIBot implements OnInit, OnDestroy {

    @Input("isDevBotOpenIn") public isBotOpen: boolean;
    @Output("isDevBotOpenOut") public emitBotOpen = new EventEmitter();

    @ViewChild("botHistory") public historyDiv: ElementRef;
    @ViewChild("botQueryInput") public queryInput: ElementRef;

    public view = {
        history: [] as IBotHistory[],
        query: "",
        isBusy: false,
    };

    private _subscription: Subscription;


    constructor (
        @Inject(BotService) private bot: BotService
    ) {}

    public ngOnInit () {

        this.view.history = [{
                type: "card",
                ts: new Date(),
                from: BOT_NAME,
                message: `
                    <h1>Welcome to DevBot Beta</h1>
                    <p>The DevBot is an automated service to help you accomplish simple tasks like managing your
                        applications and making payments. Talk to it like you would a person and see how it can
                        help you.</p>
                    <p>Type "I need help" for more details and example queries.</p>
                `,
            }, {
                type: "bot",
                ts: new Date(),
                from: BOT_NAME,
                message: "Hello! I'm the DevBot. How can I help you?",
            }];

        this._subscription = this.bot.Observable
            .subscribe((bot: IBotSubscriptionNext) => {
                this.view.isBusy = false;
                this.view.history.push({
                    type: bot.type,
                    ts: new Date(),
                    from: BOT_NAME,
                    message: bot.message,
                });
                setTimeout(() => {
                    this.historyDiv.nativeElement.scrollTop = this.historyDiv.nativeElement.scrollHeight;
                    this.queryInput.nativeElement.focus();
                }, 100);
            });
    }

    public ngOnDestroy () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    public onClearHistory () {
        this.view.history = [{
            type: "bot",
            ts: new Date(),
            from: BOT_NAME,
            message: "Ok. A new chat session has been started.",
        }];
        this.onNewSession();
    }

    public onNewSession () {
        this.bot.newSession();
    }

    public onHide () {
        // this.isBotOpen = false;
        this.emitBotOpen.emit(false);
    }

    public onSubmit () {

        if (! this.view.query) {
            return;
        }

        this.bot.query(this.view.query);

        this.view.history.push({
            type: "user",
            ts: new Date(),
            from: "You",
            message: this.view.query,
        });
        this.view.isBusy = true;
        this.view.query = "";
        setTimeout(() => {
            this.historyDiv.nativeElement.scrollTop = this.historyDiv.nativeElement.scrollHeight;
            this.queryInput.nativeElement.focus();
        }, 100);
    }
}
