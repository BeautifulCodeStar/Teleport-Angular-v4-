
import { TestBed, inject } from "@angular/core/testing";
import { HttpModule }      from "@angular/http";

import { TeleportSampleService } from "./sample.service";
// import {MaterialModule} from "@angular/material";
// import {RouterModule} from "@angular/router";

import "rxjs/Rx";

describe ("/services/sample.service", function () {

    let service: TeleportSampleService;

    beforeEach(done => {

        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                TeleportSampleService,
            ],
        }).compileComponents().then(() => {
            service = TestBed.get(TeleportSampleService);
            expect(service).toBeDefined();
            done();
        });

    });

    /**
     * This seems to require the TestBed config, so it's dubiously helpful here.
     */
    it ("inject", inject([TeleportSampleService], (s: TeleportSampleService) => {

        return new Promise(res => {

            expect(s).toBeDefined();
            res(true);
        });
    }));


    it ("should emit via ObservableIO", function (done) {

        service.ObservableIO().run()
            .first(data => data.isJust())
            .subscribe(
                data => {
                    expect(data.some()).toBe("Hello");
                },
                err => {
                    console.error(err);
                    fail("Observable error called.");
                },
                () => {
                    expect(true).toBe(true);
                    service.dispose();
                    done();
                },
            );
    });
});
