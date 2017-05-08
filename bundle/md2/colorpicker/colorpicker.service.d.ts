import { Rgba, Hsla, Hsva } from './colorpicker';
export declare class ColorpickerService {
    constructor();
    hsla2hsva(hsla: Hsla): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    hsva2hsla(hsva: Hsva): Hsla;
    rgbaToHsva(rgba: Rgba): Hsva;
    hsvaToRgba(hsva: Hsva): Rgba;
    stringToHsva(colorString: string): any;
    outputFormat(hsva: Hsva, outputFormat: string): string;
    hexText(rgba: Rgba): string;
    denormalizeRGBA(rgba: Rgba): Rgba;
}
