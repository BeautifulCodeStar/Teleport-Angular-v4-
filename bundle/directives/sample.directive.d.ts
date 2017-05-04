import { ElementRef } from "@angular/core";
export declare class TeleportSampleDirective {
    private el;
    private _defaultColor;
    constructor(el: ElementRef);
    highlightColor: string;
    defaultColor: string;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private highlight(color);
}
