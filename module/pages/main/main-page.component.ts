
import { Component } from "@angular/core";


export interface IFormData {
    readonly username: string;
    readonly password: string;
}


@Component({
    moduleId    : String(module.id),
    selector    : "teleport-my-module-main-page",
    templateUrl : "./main-page.html",
    styleUrls   : [ "./main-page.css" ],
})
export class MyModuleMainPageComponent {

    public formData: IFormData;
    private origData: IFormData;

    constructor() {

        this.origData = Object.assign({}, {
            username: "myUsername",
            password: "myPassword",
        });

        this.formData = Object.assign({}, this.origData);
    }

    public onLogin () {
        console.log("onLogin() Event", this.formData);
    }

    public onCancel () {
        console.log("onCancel() Event", this.formData);
        this.formData = Object.assign({}, this.origData);
    }
}
