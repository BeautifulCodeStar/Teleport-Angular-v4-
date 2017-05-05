
import {
    Component, ElementRef, Input, Output, ViewChild,
    AfterViewInit, OnDestroy, EventEmitter,
} from "@angular/core";

import { Observable }   from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

declare const window: any;


@Component({
    selector: "recaptcha-button",
    template: `<div #renderDiv></div><button [disabled]="disabled" (click)="onButtonClick()" class="btn btn-success"><ng-content></ng-content></button>`,
})
export class ReCaptchaButton implements AfterViewInit, OnDestroy {

    @ViewChild("renderDiv") public renderDiv: ElementRef;

    @Input("sitekey")  public sitekey: string;
    @Input("disabled") public disabled: boolean;
    @Input("onReset")  public onReset: Observable<boolean>;

    @Output() public onSubmit = new EventEmitter();

    private _widgetId: any;
    private subscription: Subscription;


    public ngAfterViewInit () {

        this._widgetId = window.grecaptcha.render(this.renderDiv.nativeElement, {
            sitekey  : this.sitekey,
            size     : "invisible",
            callback : (token: string) => this.onSubmit.emit(token),
        });

        if (this.onReset) {
            this.subscription = this.onReset.subscribe(() => window.grecaptcha.reset(this._widgetId));
        }
    }

    public ngOnDestroy () {

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private onButtonClick () {
        window.grecaptcha.execute(this._widgetId);
    }
}
