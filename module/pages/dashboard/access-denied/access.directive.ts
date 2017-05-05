
import { Directive, ElementRef, Input, Renderer2, Inject, AfterViewInit } from "@angular/core";

import { validate }       from "../../../utils/Permissions";
import { SessionService } from "../../../services/session.service";


@Directive({
    selector: "[allowAccess]",
})
export class AllowAccessDirective implements AfterViewInit {

    @Input("allowAccess") private allowAccess: string;

    constructor(
        @Inject(ElementRef)     private el: ElementRef,
        @Inject(Renderer2)      private renderer: Renderer2,
        @Inject(SessionService) private session: SessionService,
    ) {
        renderer.addClass(el.nativeElement, "block-access");
    }

    public ngAfterViewInit () {

        this.session.Observable
            .first(s => !! s && !! s.developer)
            .subscribe (s => {

                if (this.allowAccess.split(" ").some(p => s !== null && validate(s.developer.permissions, { [p]: true }))) {
                    this.renderer.removeClass(this.el.nativeElement, "block-access");
                }
            });
    }
}
