
import { Injectable, Inject } from "@angular/core";
import { Http }               from "@angular/http";

import { IO, Maybe } from "monet";

import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/multicast";

import { Observable }      from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { interfaces } from "shoutpoint-teleport-core";


@Injectable()
export class TeleportSampleService implements interfaces.IOService {


    private _observable: Observable<Maybe<string>> = Observable.of(Maybe.None<string>());


    constructor (@Inject(Http) private http: Http) {

        // console.log("new SampleService()");

        let data: Maybe<string> = Maybe.None<string>();

        this._observable = Observable
            .interval(500)
            .switchMap(() => {
                return this.http.get("https://cors-test.appspot.com/test")
                    .catch (err => Observable.throw(new Error(`Something bad happened. ${err}`)))
                    .map   (()  => "Hello")
                    .map   (s   => Maybe.Some(s));
            })
            .do((s: Maybe<string>) => {
                // console.log("SampleService Observable.do()");
                data = s;
            })
            .multicast(new BehaviorSubject(data))
            .refCount();
    }

    /**
     * Returns Observable<ISession> that broadcasts regular Session state.
     * @returns {IO<Observable<Maybe<string>>>}
     */
    public ObservableIO (): IO<Observable<Maybe<string>>> {

        return IO(() => this._observable);
    }

    public dispose () { /* Empty */ }
}
