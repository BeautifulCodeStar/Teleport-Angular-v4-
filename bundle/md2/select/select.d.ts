import { AfterContentInit, AfterContentChecked, EventEmitter, OnInit, QueryList, ElementRef, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MD2_SELECT_CONTROL_VALUE_ACCESSOR: any;
export declare type Md2SelectDispatcherListener = (id: string, name: string) => void;
export declare class Md2SelectDispatcher {
    private _listeners;
    notify(id: string, name: string): void;
    listen(listener: Md2SelectDispatcherListener): void;
}
export declare class Md2OptionChange {
    source: Md2Option;
    value: any;
}
export declare class Md2Select implements AfterContentInit, AfterContentChecked, ControlValueAccessor {
    element: ElementRef;
    private _value;
    private _name;
    private _disabled;
    private _selected;
    private _isInitialized;
    private isOpenable;
    private isMenuVisible;
    private selectedValue;
    private focusIndex;
    private _controlValueAccessorChangeFn;
    onTouched: () => any;
    change: EventEmitter<Md2OptionChange>;
    _options: QueryList<Md2Option>;
    name: string;
    tabindex: number;
    placeholder: string;
    disabled: boolean;
    value: any;
    selected: Md2Option;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    private equals(o1, o2);
    private updateScroll();
    private getFocusIndex();
    private updateFocus(inc);
    private onClick(e);
    private onKeyDown(event);
    onBlur(): void;
    touch(): void;
    private _updateOptions();
    private _updateSelectedOptionValue();
    private _emitChangeEvent();
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
}
export declare class Md2Option implements OnInit {
    private selectDispatcher;
    private element;
    private _selected;
    private _disabled;
    private _value;
    focused: boolean;
    id: string;
    name: string;
    content: any;
    select: Md2Select;
    constructor(select: Md2Select, selectDispatcher: Md2SelectDispatcher, element: ElementRef);
    selected: boolean;
    value: any;
    disabled: boolean;
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    onClick(event: Event): void;
}
export declare const MD2_SELECT_DIRECTIVES: (typeof Md2Select | typeof Md2Option)[];
export declare class Md2SelectModule {
    static forRoot(): ModuleWithProviders;
}
