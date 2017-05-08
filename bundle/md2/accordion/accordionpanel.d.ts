import { EventEmitter } from '@angular/core';
import { Md2AccordionTab } from './accordiontab';
export declare class Md2Accordion {
    multiple: boolean;
    class: string;
    close: EventEmitter<any>;
    open: EventEmitter<any>;
    tabs: Md2AccordionTab[];
    addTab(tab: Md2AccordionTab): void;
}
