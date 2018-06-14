import { Component } from '@angular/core';

import { Student as Student } from '../model/Student';
import { GenderEnum as GenderEnum } from '../util/GenderEnum';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css']
})
export class ClassComponent {
    /* Properties */
    private id: number = 1;
    private name: string = "9/8";
    private students: Student[] = [];
    /* Form Data */
    private studentDTO: Student;
    /* Sequence-generated Values  */
    private generatedStudentId: number = 0;
    /* Constructor */
    constructor() {
        this.studentDTO = new Student(++this.generatedStudentId, '', GenderEnum.FEMALE, 0);
    }
    /* Getters and Setters */
    public getStudentDTO(): Student {
        return this.studentDTO;
    }
    public getStudents(): Student[] {
        return this.students;
    }
    /* Functionalities */
    public onCreateStudent(): boolean {
        let isDone: boolean = false;
        try {
            this.students.push(this.studentDTO);
            this.studentDTO = new Student(++this.generatedStudentId, '', GenderEnum.FEMALE, 0);
            isDone = true;
        } catch(ex) {
            console.error("addNewStudent(): ", ex);
        }
        return isDone;
    }

    public onDeleteStudent(selectedStudentId: number): boolean {
        let isDone: boolean = false;
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
        return isDone;
    }
}