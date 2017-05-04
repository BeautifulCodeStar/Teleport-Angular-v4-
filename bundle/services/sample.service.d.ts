import { Http } from "@angular/http";
import { IO, Maybe } from "monet";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/multicast";
import { Observable } from "rxjs/Observable";
import { interfaces } from "shoutpoint-teleport-core";
export declare class TeleportSampleService implements interfaces.IOService {
    private http;
    private _observable;
    constructor(http: Http);
    ObservableIO(): IO<Observable<Maybe<string>>>;
    dispose(): void;
}
