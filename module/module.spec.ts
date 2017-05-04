
import { TestBed, inject } from "@angular/core/testing";

import { MyModuleNameModule }      from "./index";
import { MyModuleNameComponent }   from "./module.component";


describe("/index", function () {

    beforeEach(done => {

        return TestBed.configureTestingModule({
            imports: [
                MyModuleNameModule,
            ],
            providers: [
                MyModuleNameComponent,
            ],
        }).compileComponents().then(() => done());

    });


    it ("should make MyModuleNameComponent available for injection", inject(
        [
            MyModuleNameComponent,
        ],
        function (
            a: MyModuleNameComponent,
        ) {

        return new Promise(res => {

            expect(a).toBeDefined();
            res(true);
        });
    }));

});
