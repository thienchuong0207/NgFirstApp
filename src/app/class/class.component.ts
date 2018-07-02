import { Component, ViewEncapsulation } from '@angular/core';

import { Student as Student } from '../model/Student';
import { GenderEnum as GenderEnum } from '../util/GenderEnum';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ClassComponent {

    /* Properties */
    private id: number = 1;
    private name: string = "9/8";
    private students: Student[] = [];
    
    /* Constructor */
    constructor() {}
    
    /* Functions */
    
    /**
     * Add new student to Student List
     * @param event
     */
    public onStudentAdded(event: {newStudent: Student}): boolean {
        let isDone: boolean = false;
        try {
            this.students.push(event.newStudent);
            isDone = true;
        } catch(ex) {
            console.error('ClassComponent.addNewStudent(): ', ex);
        }
        return isDone;
    }

    /**
     * Remove a student from Student List
     * @param selectedStudentId 
     */
    public onStudentRemoved(selectedStudentId: number): boolean {
        let isDone: boolean = false;
        try {
            if (this.students && this.students.length > 0) {
                console.log(`Deleting Student: ${selectedStudentId}`);
                let index: number = -1;
                this.students.forEach(student => {
                    index++;
                    if (student.getId() == selectedStudentId) {
                        this.students.splice(index, 1);
                        isDone = true;
                    }
                });
            }
        } catch(ex) {
            console.error('ClassComponent.onDeleteStudent(): ', ex);
        }
        return isDone;
    }
}