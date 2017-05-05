
import { NgModule } from "@angular/core";

import { RolePickerWidget, RolePickerRow } from "./role-picker.component";
import {SharedModule} from "../../../../shared.module";


@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        RolePickerWidget,
        RolePickerRow,
    ],
    exports: [
        RolePickerWidget,
        RolePickerRow,
    ],
})
export class RolePickerModule {}
