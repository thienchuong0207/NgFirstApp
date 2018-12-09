import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ClassComponent } from './component/class/class.component';
import { SignInComponent } from './component/signin/signin.component';
import { LandingComponent } from './component/landing/landing.component'
import { AuthGuard } from './guard/AuthGuard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'landing',
        component: LandingComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                outlet: 'landingRouterOutlet'
            },
            {
                path: 'class',
                component: ClassComponent,
                outlet: 'landingRouterOutlet'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}