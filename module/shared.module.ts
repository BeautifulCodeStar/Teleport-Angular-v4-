
import { NgModule }      from "@angular/core";
import { CommonModule }  from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule }    from "@angular/http";

import { LoginService }   from "./services/login.service";
import { MessageService } from "./services/message.service";
import { Modal }          from "./services/modal.service";

import { TeleportReCaptchaComponent } from "./components/recaptcha/recaptcha.component";

/**
 * Share this module with other core modules.
 */
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        TeleportReCaptchaComponent,
    ],
    providers: [
        LoginService,
        Modal.Service,
        MessageService,
    ],
    exports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        TeleportReCaptchaComponent,
    ],
})
export class SharedModule {}
