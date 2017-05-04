
import { TestBed, ComponentFixture } from "@angular/core/testing";

import { By, BrowserModule } from "@angular/platform-browser";
import { FormsModule }       from "@angular/forms";

import { MaterialModule } from "@angular/material";

import { directives } from "shoutpoint-teleport-core";

import { MyModuleMainPageComponent } from "./main-page.component";



describe ("/pages/main/main-page.component", function () {

    let fixture: ComponentFixture<MyModuleMainPageComponent>;
    let component: MyModuleMainPageComponent;

    beforeEach(done => {

        // Call TestBed.compileComponents() because external HTML/CSS.
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                FormsModule,
                MaterialModule.forRoot(),
                directives.PublicDirectivesModule,
            ],
            declarations: [
                MyModuleMainPageComponent,
            ],
        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(MyModuleMainPageComponent);
            expect(fixture).toBeDefined();
            component = fixture.componentInstance;
            expect(component).toBeDefined();

            fixture.detectChanges();
            done();
        });

    });


    it ("should handle web form events", function () {

        expect(component.formData.username).toBe("myUsername");
        expect(component.formData.password).toBe("myPassword");

        const unInput = fixture.debugElement.query(By.css("md-card input[type=text]"));
        const pwInput = fixture.debugElement.query(By.css("md-card input[type=password]"));
        const loginBtn = fixture.debugElement.query(By.css("md-card button:first-child"));
        const cancelBtn = fixture.debugElement.query(By.css("md-card button:last-child"));

        loginBtn.triggerEventHandler("click", undefined);

        unInput.nativeElement.value = "changedUN";
        unInput.nativeElement.dispatchEvent(new Event("input"));
        pwInput.nativeElement.value = "changedPW";
        pwInput.nativeElement.dispatchEvent(new Event("input"));

        fixture.detectChanges();

        expect(component.formData.username).toBe("changedUN");
        expect(component.formData.password).toBe("changedPW");

        cancelBtn.triggerEventHandler("click", undefined);

        fixture.detectChanges();

        expect(component.formData.username).toBe("myUsername");
        expect(component.formData.password).toBe("myPassword");
    });


    afterEach(() => {
        fixture.destroy();
    });

});
