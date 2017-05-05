
import {Directive, ElementRef, Input, Renderer, Inject, AfterViewInit} from "@angular/core";

import { IUserPermissions } from "../../../models/interfaces";

import { validate }       from "../../../utils/Permissions";
import { SessionService } from "../../../services/session.service";


@Directive({
    selector: "[allowAccess]",
})
export class AllowAccessDirective implements AfterViewInit {

    @Input("allowAccess") private permissions: string;

    constructor(
        @Inject(ElementRef)     private el: ElementRef,
        @Inject(Renderer)       private renderer: Renderer,
        @Inject(SessionService) private session: SessionService,
    ) {
        renderer.setElementClass(el.nativeElement, "block-access", true);
    }

    public ngAfterViewInit () {

        // console.log("PERMISSIONS =>", this.permissions, this.el.nativeElement);
        this.session.Observable
            .first(s => !! s && !! s.developer)
            .subscribe (s => {

                if (this.permissions.split(" ").some(p => validate(s.developer.permissions, { [p]: true }))) {
                    this.renderer.setElementClass(this.el.nativeElement, "block-access", false);
                }
            });
    }
}
