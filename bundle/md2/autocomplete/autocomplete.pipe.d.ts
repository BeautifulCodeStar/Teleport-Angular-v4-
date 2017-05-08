import { PipeTransform } from '@angular/core';
export declare class HightlightPipe implements PipeTransform {
    transform(value: string, query: string): string;
    private escapeRegexp(queryToEscape);
}
