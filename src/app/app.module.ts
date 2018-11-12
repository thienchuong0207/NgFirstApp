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
import { SignInComponent } from './component/signin/signin.component'
import { LandingComponent } from './component/landing/landing.component'
import { ClassService } from './service/ClassService';
import { LoggingService } from './service/LoggingService';
import { AuthService } from './service/AuthService';
import { AuthGuard } from './guard/AuthGuard';
import { StudentsFilter } from './pipe/student/list/filter.pipe';
import { AppRoutingModule } from './app.routing.module';

/* These two modules are used for displaying/processing Dialog */
/* 1. Use DialogModule from PrimeNG for Dialog UI Component */
import { DialogModule } from 'primeng/dialog';
/* 2. Use BootstrapModalModule from ng2-bootstrap-modal for Dialog
      behind-the-scenes (receive input, return output...) procssing only */
import { BootstrapModalModule, DialogService } from 'ng2-bootstrap-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* This module is used to display Progress Spinner */
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/* This module is used for pagination */
import { PaginatorModule } from 'primeng/paginator';
import { StudentImageViewerDialogComponent } from './component/student/list/dialog/imgViewer/student.image.viewer.dialog.compoent';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentsFilter,
    StudentDeletionDialogComponent,
    StudentImageViewerDialogComponent,
    SignInComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DialogModule,
    BootstrapModalModule.forRoot({container: document.body}),
    ProgressSpinnerModule,
    PaginatorModule
  ],
  providers: [
    ClassService,
    LoggingService,
    AuthService,
    AuthGuard,
    DialogService
  ],
  entryComponents: [
    StudentDeletionDialogComponent,
    StudentImageViewerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
