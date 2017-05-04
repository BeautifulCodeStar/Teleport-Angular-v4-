
import { Inject, Directive, ElementRef, Input, HostListener } from "@angular/core";

/**
 * Sample Attribute Directive
 *
 * To help avoid conflicts, prepend directives this "tp".
 *
 * This sample is basically taken from the angular.io docs:
 * https://angular.io/docs/ts/latest/guide/attribute-directives.html
 */
@Directive({
    selector: "[tpSampleAttr]",
})
export class TeleportSampleDirective {

    private _defaultColor = "red";


    constructor (
        @Inject(ElementRef) private el: ElementRef,
    ) { }


    @Input("tpSampleAttr") highlightColor: string;


    @Input() set defaultColor (colorName: string) {
        this._defaultColor = colorName || this._defaultColor;
    }


    @HostListener("mouseenter") public onMouseEnter () {
        this.highlight(this.highlightColor || this._defaultColor);
    }


    @HostListener("mouseleave") public onMouseLeave () {
        this.highlight("");
    }


    private highlight (color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
