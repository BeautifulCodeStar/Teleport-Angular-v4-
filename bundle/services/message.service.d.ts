import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class MessageService {
    private doc;
    private store$;
    private dispatcher$;
    private containerDiv;
    constructor(doc: HTMLDocument, store$: Store<TeleportCoreState>, dispatcher$: ReducerManagerDispatcher);
    info(title: string, message: string): void;
    warning(title: string, message: string, err?: Error): ErrorObservable;
    error(title: string, message: string, err?: Error): ErrorObservable;
    private initAlert(title, message, type);
}
