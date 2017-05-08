import { OnInit, EventEmitter, ModuleWithProviders, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ColorpickerService } from './colorpicker.service';
export declare const MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR: any;
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    rg: number;
    changeInput(value: string): void;
}
export declare class ColorpickerSliderDirective {
    private el;
    slider: string;
    pointX: number;
    pointY: number;
    change: EventEmitter<any>;
    private listenerMove;
    private listenerStop;
    constructor(el: ElementRef);
    setCursor(event: any): void;
    move(event: any): void;
    start(event: any): void;
    stop(): void;
    getX(event: any): number;
    getY(event: any): number;
}
export declare class Md2Colorpicker implements OnInit, ControlValueAccessor {
    private service;
    private el;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    private created;
    private defalutColor;
    private isColorpickerVisible;
    private slider;
    private sliderDim;
    private hueSliderColor;
    private hsva;
    private outputColor;
    private alphaColor;
    private rgbaText;
    private hslaText;
    private hexText;
    private format;
    private initialColor;
    private toggled;
    cFormat: string;
    colorpickerChange: EventEmitter<string>;
    change: EventEmitter<string>;
    tabindex: number;
    disabled: boolean;
    id: string;
    value: any;
    constructor(service: ColorpickerService, el: ElementRef);
    ngOnInit(): void;
    private showColorpicker();
    changeInput(event: any): void;
    setSaturation(val: {
        v: number;
        rg: number;
    }): void;
    setLightness(val: {
        v: number;
        rg: number;
    }): void;
    setHue(val: {
        v: number;
        rg: number;
    }): void;
    setAlpha(val: {
        v: number;
        rg: number;
    }): void;
    setR(val: {
        v: number;
        rg: number;
    }): void;
    setG(val: {
        v: number;
        rg: number;
    }): void;
    setB(val: {
        v: number;
        rg: number;
    }): void;
    setSaturationAndBrightness(val: {
        s: number;
        v: number;
        pointX: number;
        pointY: number;
    }): void;
    colorChanged(value: string): void;
    setColorFromString(value: string): void;
    formatPolicy(): number;
    update(): void;
    isDescendant(parent: any, child: any): boolean;
    clickOk(): void;
    cancelColor(): void;
    closeColorpicker(): void;
    createBox(element: any, offset: any): {
        top: any;
        left: any;
        width: any;
        height: any;
    };
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare class Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class Hsla {
    h: number;
    s: number;
    l: number;
    a: number;
    constructor(h: number, s: number, l: number, a: number);
}
export declare class Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number);
}
export declare class SliderPosition {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class SliderDimension {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare const MD2_COLORPICKER_DIRECTIVES: (typeof Md2Colorpicker | typeof TextDirective | typeof ColorpickerSliderDirective)[];
export declare class Md2ColorpickerModule {
    static forRoot(): ModuleWithProviders;
}
