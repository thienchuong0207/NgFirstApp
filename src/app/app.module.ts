import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClassComponent } from './component/class/class.component';
import { HomeComponent } from './component/home/home.component';
import { StudentFormComponent } from './component/student/form/student.form.component';
import { StudentListComponent } from './component/student/list/student.list.component';
import { ClassService } from './service/ClassService';
import { LoggingService } from './service/LoggingService';
import { StudentsFilter } from './pipe/student/list/filter.pipe';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentsFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ClassService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
