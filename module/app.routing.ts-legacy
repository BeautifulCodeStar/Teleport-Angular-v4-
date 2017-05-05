
import { Routes, RouterModule } from "@angular/router";

import { UIHome }            from "./directives/home/home.component";
import { UILogin }           from "./directives/login/login.component";
import { UIRegister }        from "./directives/register/register.component";
import { UIForgotPassword }  from "./directives/forgot-password/forgot.component";
import { UIRecoverPassword } from "./directives/recover-password/recover.component";


const appRoutes: Routes = [
    { path: "",                      component: UIHome            },
    { path: "login",                 component: UILogin           },
    { path: "register",              component: UIRegister        },
    { path: "forgot-password",       component: UIForgotPassword  },
    { path: "recover-password/:key", component: UIRecoverPassword },
];

// export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
