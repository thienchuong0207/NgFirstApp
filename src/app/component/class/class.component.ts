import { Component, ViewEncapsulation } from '@angular/core';

import { Student as Student } from '../../model/Student';
import { ClassService } from '../../service/ClassService';
import { LoggingService } from '../../service/LoggingService';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css'],
    providers: [ClassService],
    encapsulation: ViewEncapsulation.Emulated
})
export class ClassComponent {

    /* Properties */
    private id: number = 1;
    private name: string = "9/8";
    private teacherName: string = "";
    private students: Student[] = [];

    /* Display photo of selected student */
    private studentDetailPhoto: string = '';

    /* Dependencies */
    private classService: ClassService;
    private loggingService: LoggingService;

    /* Constructor */
    constructor(classService: ClassService, loggingService: LoggingService) {
        this.classService = classService;
        this.loggingService = loggingService;
        if (classService) {
            this.classService.getClassById("C01").subscribe(
                (response) => {
                    let responseStatus = response.status;
                    if (responseStatus == 200) {
                        let data = response.json();
                        this.teacherName = data.teacherName;
                    }
                },
                (error) => {
                    loggingService.error(error);
                }
            );
        }
    }

    /* Functions */

    /**
     * Add new student to Student List
     * @param event
     */
    public onStudentAdded(event: { newStudent: Student }): void {
        let isSuccessful: boolean = this.classService.addNewStudent(event.newStudent);
        if (isSuccessful) {
            this.students = this.classService.getAllStudents();
        }
    }

    /**
     * Remove a student from Student List
     * @param selectedStudentId 
     */
    public onStudentRemoved(event: { removedStudentId: number }): void {
        let isSuccessful: boolean = this.classService.removeStudent(event.removedStudentId);
        if (isSuccessful) {
            this.students = this.classService.getAllStudents();
            this.studentDetailPhoto = '';
        }
    }
}