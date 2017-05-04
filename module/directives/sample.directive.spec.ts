
import { TestBed, ComponentFixture } from "@angular/core/testing";

import { Component } from "@angular/core";
import { By }        from "@angular/platform-browser";

import { TeleportSampleDirective } from "./index";


@Component({
    selector: "teleport-test-component",
    template: `<div [tpSampleAttr]="'green'" defaultColor="blue">Hover over me!</div>`,
})
class TestingComponent {}



describe ("/directives/sample.directive", function () {

    let fixture: ComponentFixture<TestingComponent>;
    let directive: TestingComponent;

    beforeEach(() => {

        // No need to call TestBed.compileComponents() because no external HTML/CSS.
        TestBed.configureTestingModule({
            declarations: [
                TeleportSampleDirective,
                TestingComponent,
            ],
        });

        fixture = TestBed.createComponent(TestingComponent);
        expect(fixture).toBeDefined();
        directive = fixture.componentInstance;
        expect(directive).toBeDefined();

        fixture.detectChanges();
    });


    it ("should change backgroundColor on events", function () {

        const dbEl = fixture.debugElement.query(By.css("div")); // .query(By.directive(TestingComponent));
        const el = dbEl.nativeElement;

        expect(el.style.backgroundColor).toBe("", "Initial value not empty.");

        dbEl.triggerEventHandler("mouseenter", undefined);
        fixture.detectChanges();
        expect(el.style.backgroundColor).toBe("green", "onMouseEnter not green.");

        dbEl.triggerEventHandler("mouseleave", undefined);
        fixture.detectChanges();
        expect(el.style.backgroundColor).toBe("", "End value not empty.");
    });


    afterEach(() => {
        fixture.destroy();
    });

});
