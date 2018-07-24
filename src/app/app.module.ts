import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { ClassComponent } from './component/class/class.component';
import { StudentFormComponent } from './component/student/form/student.form.component';
import { ClassService } from './service/ClassService';
import { LoggingService } from './service/LoggingService';

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "class", component: ClassComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassComponent,
    StudentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ ClassService, LoggingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
