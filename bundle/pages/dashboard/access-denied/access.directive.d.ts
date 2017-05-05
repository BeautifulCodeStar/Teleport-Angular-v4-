import { ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { SessionService } from "../../../services/session.service";
export declare class AllowAccessDirective implements AfterViewInit {
    private el;
    private renderer;
    private session;
    private allowAccess;
    constructor(el: ElementRef, renderer: Renderer2, session: SessionService);
    ngAfterViewInit(): void;
}
