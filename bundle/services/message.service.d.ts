import { ErrorObservable } from "rxjs/observable/ErrorObservable";
export declare class MessageService {
    private doc;
    private containerDiv;
    constructor(doc: HTMLDocument);
    info(title: string, message: string): void;
    warning(title: string, message: string, err?: Error): ErrorObservable;
    error(title: string, message: string, err?: Error): ErrorObservable;
    private initAlert(title, message, type);
}
