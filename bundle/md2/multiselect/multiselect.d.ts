import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Multiselect implements AfterContentInit, ControlValueAccessor {
    private element;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    change: EventEmitter<any>;
    private _value;
    private _disabled;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _options;
    private list;
    private items;
    private focusedOption;
    private isFocused;
    id: string;
    disabled: boolean;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
    options: Array<any>;
    value: any;
    private setValue(value);
    private equals(o1, o2);
    readonly isMenuVisible: boolean;
    private updateScroll();
    private onClick(event);
    private onKeyDown(event);
    private onFocus();
    private onBlur();
    private isActive(index);
    private toggleOption(event, index);
    private updateOptions();
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_MULTISELECT_DIRECTIVES: typeof Md2Multiselect[];
export declare class Md2MultiselectModule {
    static forRoot(): ModuleWithProviders;
}
