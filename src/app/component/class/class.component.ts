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
    private id: string = 'C01';
    private name: string = '';
    private teacherName: string = '';
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
            this.classService.getClassById(this.id).subscribe(
                (data: {id: string, name: string, teacherName: string}) => {
                    this.name = data.name;
                    this.teacherName = data.teacherName;
                },
                (error) => {
                    loggingService.error(error);
                }
            );
        }
    }

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
    public onStudentRemoved(event: { removedStudentId: string }): void {
        let isSuccessful: boolean = this.classService.removeStudent(event.removedStudentId);
        if (isSuccessful) {
            this.students = this.classService.getAllStudents();
            this.studentDetailPhoto = '';
        }
    }
}