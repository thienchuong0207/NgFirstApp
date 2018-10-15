import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ClassComponent } from './component/class/class.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'class', component: ClassComponent}
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