import { Component, ViewEncapsulation } from '@angular/core';

import { Student as Student } from '../../model/Student';
import { GenderEnum as GenderEnum } from '../../util/GenderEnum';
import { ClassService } from '../../service/ClassService';

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
    private students: Student[] = [];

    /* Display photo of selected student */
    private studentDetailPhoto: string = '';

    /* Dependencies */
    private classService: ClassService;

    /* Constructor */
    constructor(classService: ClassService) {
        this.classService = classService;
    }

    /* Functions */
    
    /**
     * Add new student to Student List
     * @param event
     */
    public onStudentAdded(event: {newStudent: Student}): void {
        let isSuccessful: boolean = this.classService.addNewStudent(event.newStudent);
        if (isSuccessful) {
            this.students = this.classService.getAllStudents();
        }
    }

    /**
     * Remove a student from Student List
     * @param selectedStudentId 
     */
    public onStudentRemoved(event: {removedStudentId: number}): void {
        console.log('def');
        let isSuccessful: boolean = this.classService.removeStudent(event.removedStudentId);
        if (isSuccessful) {
            this.students = this.classService.getAllStudents();
            this.studentDetailPhoto = '';
        }
    }
}