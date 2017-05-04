
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By }                        from "@angular/platform-browser";
import { HttpModule }                from "@angular/http";

import * as core from "shoutpoint-teleport-core";

import { TeleportSampleModuleComponent } from "./index";


describe ("/components/sample.component", function () {

    let fixture: ComponentFixture<TeleportSampleModuleComponent>;
    let component: TeleportSampleModuleComponent;

    beforeEach(() => {

        // No need to call TestBed.compileComponents() because no external HTML/CSS.
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            declarations: [
                TeleportSampleModuleComponent,
            ],
            providers: [
                // Would be interesting to mock this service.
                core.services.SampleService,
            ],
        });

        fixture = TestBed.createComponent(TeleportSampleModuleComponent);
        expect(fixture).toBeDefined();
        component = fixture.componentInstance;
        expect(component).toBeDefined();

        fixture.detectChanges(); // Trigger data binding. Else, HTML is not populated yet.
    });


    it ("should assign public properties", function () {

        expect(component.data).toBe("I am <teleport-module-sample-component>");
        expect(component.greeting).toBe("Still waiting...");
    });


    it ("should generate proper HTML", function () {

        const el = fixture.debugElement.query(By.css("div")).nativeElement;
        const content = el.textContent;
        expect(content).toContain("I am <teleport-module-sample-component> Still waiting...");
    });

});
