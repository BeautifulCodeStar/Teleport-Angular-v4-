import { ApplicationRef, ComponentFactoryResolver, ViewContainerRef, ModuleWithProviders } from '@angular/core';
export declare type TooltipPosition = 'before' | 'after' | 'above' | 'below';
export declare class Md2Tooltip {
    private _componentFactory;
    private _appRef;
    private _viewContainer;
    private visible;
    private timer;
    message: string;
    position: TooltipPosition;
    delay: number;
    private tooltip;
    constructor(_componentFactory: ComponentFactoryResolver, _appRef: ApplicationRef, _viewContainer: ViewContainerRef);
    show(event: Event): void;
    hide(event: Event): void;
}
export declare const MD2_TOOLTIP_DIRECTIVES: any[];
export declare class Md2TooltipModule {
    static forRoot(): ModuleWithProviders;
}
