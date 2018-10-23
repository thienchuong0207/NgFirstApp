import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClassComponent } from './component/class/class.component';
import { HomeComponent } from './component/home/home.component';
import { StudentFormComponent } from './component/student/form/student.form.component';
import { StudentListComponent } from './component/student/list/student.list.component';
import { StudentDeletionDialogComponent } from './component/student/list/dialog/deletion/student.deletion.dialog.component';
import { ClassService } from './service/ClassService';
import { LoggingService } from './service/LoggingService';
import { StudentsFilter } from './pipe/student/list/filter.pipe';
import { AppRoutingModule } from './app.routing.module';

/* These two modules are used for displaying/processing Dialog */
/* 1. Use DialogModule from PrimeNG for Dialog UI Component */
import { DialogModule } from 'primeng/dialog';
/* 2. Use BootstrapModalModule from ng2-bootstrap-modal for Dialog
      behind-the-scenes (receive input, return output...) procssing only */
import { BootstrapModalModule, DialogService } from 'ng2-bootstrap-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentsFilter,
    StudentDeletionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DialogModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [
    ClassService,
    LoggingService,
    DialogService
  ],
  entryComponents: [
    StudentDeletionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
