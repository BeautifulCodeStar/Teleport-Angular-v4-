import { Injectable, Inject } from "@angular/core";
import { DOCUMENT }           from "@angular/platform-browser";

import { Observable }      from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";


@Injectable()
export class MessageService {

    private containerDiv: HTMLElement;

    constructor (
        @Inject(DOCUMENT) private doc: HTMLDocument,
    ) {
        this.containerDiv = doc.getElementById("message-container-ber2z79jspqlg14i");
        if (! this.containerDiv) {
            this.containerDiv = doc.createElement("div");
            this.containerDiv.id = "message-container-ber2z79jspqlg14i";
            this.containerDiv.className = "messages-container";
            doc.body.appendChild(this.containerDiv);
        }
    }

    public info (title: string, message: string) {
        console.log("Info Message", title, message);
        this.initAlert(title, message, "success");
    }


    public warning (title: string, message: string, err?: Error): ErrorObservable {
        console.log("Warning Message", title, message, err);
        this.initAlert(title, message, "warning");
        return Observable.throw(err || new Error(message));
    }


    public error (title: string, message: string, err?: Error): ErrorObservable {
        console.error("Error Message", title, message, err);
        this.initAlert(title, message, "danger");
        return Observable.throw(err || new Error(message));
    }

    private initAlert (title: string, message: string, type: "success" | "warning" | "danger") {

        let button = this.doc.createElement("button");
        button.type = "button";
        button.className = "close";
        button.innerHTML = "&times;";

        let h = this.doc.createElement("h5");
        h.innerText = title;

        let p = this.doc.createElement("p");
        p.innerText = message;

        let alert = this.doc.createElement("div");
        alert.className = `alert alert-dismissible alert-${type} animate`;
        alert.appendChild(button);
        alert.appendChild(h);
        alert.appendChild(p);

        let autoRemoveId = setTimeout(() => {
            if (alert.parentElement) {
                alert.style.webkitAnimation = "fadeOutRight 2s";
                alert.style.animation = "fadeOutRight 2s";
                alert.style.opacity = "0";
                setTimeout(() => { if (alert.parentElement) { this.containerDiv.removeChild(alert); } }, 2100);
            }
        }, 5000);

        alert.addEventListener("click", () => {
            if (alert.parentElement) {
                clearInterval(autoRemoveId);
                alert.style.webkitAnimation = "fadeOutRight 500ms";
                alert.style.animation = "fadeOutRight 500ms";
                alert.style.opacity = "0";
                setTimeout(() => { if (alert.parentElement) { this.containerDiv.removeChild(alert); } }, 600);
            }
        });

        this.containerDiv.appendChild(alert);
    }
}
