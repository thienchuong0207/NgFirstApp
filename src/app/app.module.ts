import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassComponent } from './component/class/class.component';
import { StudentFormComponent } from './component/student/form/student.form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassComponent,
    StudentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
