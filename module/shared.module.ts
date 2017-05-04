
import { NgModule }      from "@angular/core";
import { CommonModule }  from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { HttpModule }    from "@angular/http";

import { LoginService }   from "./services/login.service";
import { MessageService } from "./services/message.service";
import { Modal }          from "./services/modal.service";

import { ReCaptchaWidget } from "./recaptcha/recaptcha.component";
// import { ReCaptchaButton } from "./recaptcha/recaptcha-button.component";

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
        ReCaptchaWidget,
        // ReCaptchaButton,
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
        ReCaptchaWidget,
        // ReCaptchaButton,
    ],
})
export class SharedModule {}
