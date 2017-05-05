
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../shared.module";

import { TeleportDevPortalRolePickerComponent, TeleportDevPortalRolePickerRowComponent } from "./role-picker.component";


@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        TeleportDevPortalRolePickerComponent,
        TeleportDevPortalRolePickerRowComponent,
    ],
    exports: [
        TeleportDevPortalRolePickerComponent,
        TeleportDevPortalRolePickerRowComponent,
    ],
})
export class RolePickerModule {}
