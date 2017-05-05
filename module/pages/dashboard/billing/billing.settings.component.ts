
import { Component, Inject, AfterViewInit } from "@angular/core";
import { BillingService }                   from "../../../services/billing.service";


declare const braintree: any;

@Component({
    selector   : "ui-billing-settings",
    templateUrl: DOC_BASE_HREF + "/directives/dashboard/billing/billing.settings.html",
})
export class UIBillingSettings implements AfterViewInit {

    constructor (
        @Inject(BillingService) private billing: BillingService,
    ) {}

    public ngAfterViewInit () {


        this.billing.getBraintreeClientToken()
            .then(token => {
                braintree.setup(token, "dropin", {
                    container: "dropin-container",
                });
            })
            .catch(err => console.log(err));
    }
}
