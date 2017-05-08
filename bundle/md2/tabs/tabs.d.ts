import { AfterContentInit, ElementRef, EventEmitter, QueryList, TemplateRef, ViewContainerRef, ModuleWithProviders } from '@angular/core';
export declare class Md2TabChangeEvent {
    index: number;
    tab: Md2Tab;
}
export declare class Md2Transclude {
    viewRef: ViewContainerRef;
    private _md2Transclude;
    constructor(viewRef: ViewContainerRef);
    private md2Transclude;
}
export declare class Md2Tab {
    label: string;
    active: boolean;
    disabled: boolean;
    class: string;
    labelRef: TemplateRef<any>;
}
export declare class Md2TabLabel {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>, tab: Md2Tab);
}
export declare class Md2Tabs implements AfterContentInit {
    private elementRef;
    tabs: QueryList<Md2Tab>;
    private _isInitialized;
    private _focusIndex;
    private _selectedIndex;
    private shouldPaginate;
    private offsetLeft;
    private inkBarLeft;
    private inkBarWidth;
    class: string;
    selectedIndex: any;
    focusIndex: number;
    readonly element: any;
    change: EventEmitter<Md2TabChangeEvent>;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    private _updateInkBar();
    private _createChangeEvent(index);
    focusNextTab(): void;
    focusPreviousTab(): void;
    scroll(event: any): void;
    nextPage(): void;
    previousPage(): void;
    onWindowResize(event: Event): void;
    canPageBack(): boolean;
    canPageForward(): boolean;
    updatePagination(): void;
    incrementIndex(inc: any): void;
    adjustOffset(index: number): void;
    fixOffset(value: any): any;
}
export declare const MD2_TABS_DIRECTIVES: any[];
export declare class Md2TabsModule {
    static forRoot(): ModuleWithProviders;
}
