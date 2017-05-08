import { ApplicationRef, ComponentFactoryResolver, ComponentRef, ModuleWithProviders } from '@angular/core';
export declare class Toast {
    message: string;
    id: number;
    isVisible: boolean;
    constructor(message: string);
}
export declare class Md2Toast {
    private _componentFactory;
    private _appRef;
    private delay;
    private index;
    container: ComponentRef<any>;
    constructor(_componentFactory: ComponentFactoryResolver, _appRef: ApplicationRef);
    toast(toast: string | {
        message: string;
        hideDelay: number;
    }): void;
    show(toastObj: string | {
        message: string;
        hideDelay: number;
    }): void;
    startTimeout(toastId: number): void;
    setupToast(toast: Toast): void;
    clear(toastId: number): void;
    clearAll(): void;
    dispose(): void;
}
export declare const MD2_TOAST_DIRECTIVES: any[];
export declare class Md2ToastModule {
    static forRoot(): ModuleWithProviders;
}
