import { Md2Accordion } from './accordionpanel';
export declare class Md2AccordionTab {
    private accordion;
    class: string;
    header: string;
    active: boolean;
    disabled: boolean;
    constructor(accordion: Md2Accordion);
    toggle(event: Event): void;
    findTabIndex(): number;
}
