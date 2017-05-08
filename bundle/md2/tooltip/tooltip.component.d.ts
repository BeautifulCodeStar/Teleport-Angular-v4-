import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Md2TooltipOptions } from './tooltip.options';
export declare class Md2TooltipComponent implements AfterViewInit {
    private _element;
    private _changeDetector;
    private _isVisible;
    private top;
    private left;
    private message;
    private position;
    private hostEl;
    constructor(_element: ElementRef, _changeDetector: ChangeDetectorRef, options: Md2TooltipOptions);
    ngAfterViewInit(): void;
    private positionElements(hostEl, targetEl, position);
    private offset(nativeEl);
    private readonly window;
    private readonly document;
}
