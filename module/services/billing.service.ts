
import { Injectable, Inject }            from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable }      from "rxjs/Observable";
import { Observer }        from "rxjs/Observer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { IPayment, IBillingRate, IDeveloper } from "../models/interfaces";

import { MessageService } from "./message.service";
import { AccountService } from "./account.service";


export interface IBillingPayload {
    balance?: number;
    payments?: IPayment[];
    dateRange?: {
        from: Date;
        to: Date;
    };
}

@Injectable()
export class BillingService {

    private _developer: IDeveloper = null;

    private _observable: Observable<IBillingPayload>;
    private _observer: Observer<IBillingPayload>;

    private _paymentsFrom: number = Date.now() - 1000 * 60 * 60 * 24 * 7;
    private _paymentsTo: number = Date.now();

    private _lastRefresh = 0;

    private _billingPayload: IBillingPayload = {};

    constructor(
        @Inject(Http)           private http: Http,
        @Inject(MessageService) private message: MessageService,
        @Inject(AccountService) private account: AccountService
    ) {
        console.log("new BillingService()", arguments);
        account.Observable
            .first(d => !! d)
            .subscribe (d => this._developer = d);
    }

    public cleanup () {
        this._billingPayload = {};
    }

    public get Observable (): Observable<IBillingPayload> {

        if (! this._observable) {

            this._observable = Observable
                .create((observer: Observer<IBillingPayload>) => this._observer = observer)
                .do ((payload: IBillingPayload) => this._billingPayload = {
                    balance   : payload.balance === undefined ? payload.balance : this._billingPayload.balance,
                    payments  : payload.payments || this._billingPayload.payments,
                    dateRange : payload.dateRange || this._billingPayload.dateRange,
                })
                .multicast(new BehaviorSubject(this._billingPayload))
                .refCount();
        }
        
        this.refresh();
        return this._observable;
    }

    public refresh (): Promise<IBillingPayload> {

        if (this._lastRefresh > Date.now() - 500) { return; }
        this._lastRefresh = Date.now();

        return new Promise((resolve, reject) => {

            Promise.all([
                    this.refreshBalance(),
                    this.refreshPayments(),
                ])
                .then(results => {
                    resolve({
                        balance   : results[0],
                        payments  : results[1],
                        dateRange : {
                            from  : new Date(this._paymentsFrom),
                            to    : new Date(this._paymentsTo),
                        },
                    });
                })
                .catch((err: Error) => reject(err));
        });
    }

    public refreshPayments (from: number = this._paymentsFrom, to: number = this._paymentsTo): Promise<IPayment[]> {

        this._paymentsTo = to;
        this._paymentsFrom = from;

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments",
        ].join("/");

        return this.http.get(url, {search: `begin_date=${new Date(from).toISOString()}&end_date=${new Date(to).toISOString()}`, withCredentials: true })
            .catch(err      => Observable.throw(new Error(err.json().user_message)))
            .map  (resp     => resp.json().payments)
            .map  ((payments: IPayment[]) => payments.map((p: IPayment) => Object.assign({}, p, {submitted_on: new Date(String(p.submitted_on))})))
            .do   ((payments: IPayment[]) => payments.sort((a: any, b: any) => b.submitted_on - a.submitted_on))
            .do   ((payments: IPayment[]) => this._observer.next({
                payments,
                dateRange: {
                    from: new Date(this._paymentsFrom),
                    to: new Date(this._paymentsTo),
                },
            }))
            .catch(err      => this.message.error("Payments Load Failure", err.message, err))
            .toPromise();
    }


    public refreshBalance (): Promise<number> {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/balance",
        ].join("/");

        return this.http.get(url, { withCredentials: true })
            .catch(err     => Observable.throw(new Error(err.json().user_message)))
            .map  (resp    => resp.json().balance)
            .do   ((balance: number) => this._observer.next({balance}))
            .catch(err     => this.message.error("Account Balance Load Failure", err.message, err))
            .toPromise();
    }


    public getBraintreeClientToken (): Promise<string> {

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments/braintree-client-token",
        ].join("/");

        return this.http.get(url, { withCredentials: true })
            .catch (err  => Observable.throw(new Error(err.json().user_message)))
            .map   (resp => resp.json().clientToken)
            .catch (err  => this.message.error("Payment Setup Failure", err.message, err))
            .toPromise();
    }
    
    public makePayment (amount: number, nonce: string, method: string, card_type?: string, last_four?: string): Promise<any> {

        let payment_method = {nonce, method, card_type, last_four};

        let url = [
            API_BASE_URL,
            "developers",
            encodeURIComponent(this._developer.id),
            "payments",
        ].join("/");

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(url, JSON.stringify({amount, payment_method}), options)
            .catch(err     => Observable.throw(new Error(err.json().help)))
            .map  (resp    => resp.json().transaction)
            .toPromise();
    }
}
